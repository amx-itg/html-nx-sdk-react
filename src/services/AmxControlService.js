/* eslint-disable */

import axios from 'axios';
import eventBus from '../lib/eventBus';
import { HcBroadCastService } from './HcBroadCastService';
import JSEncrypt from 'jsencrypt';

export class AmxControlService {
  constructor() {
    this.hc = {};
    this.closeAllow = false;
    this.tFile = '';
    this.pfTO = '';
    this.hcBroadcast = HcBroadCastService;
    this.errorMessage = '';
    this.location = {
      host: '',
      path: '',
      port: '',
    };
    this.connection = {
      url: '',
      key: '',
      username: '',
      password: '',
      connectSecurity: '',
      token: '',
    };
    this.mode = '';
    this.wsType = '';
    this.isConnected = false;
    this.keepAlive = {
      to: '',
      interval: 120000,
      params: ['version'],
    };
  }

  setInternal = async () => {
    try {
      const response = await axios.get('config?websocket');
      console.log('Got Internal Connection Response');
      this.location.host = response.data.websocket.host;
      this.location.path = response.data.websocket.path;
      this.location.port = response.data.websocket.port;

      //TODO - Still Needed?
      if (this.location.host !== location.hostname)
        this.location.host = location.hostname;
      this.mode = 'internal';
    } catch (err) {}
  };
  getExternalCredentials = async (url, autoConnect) => {
    try {
      const response = await axios.get(url);
      this.connection.url = response.data.url;
      this.connection.key = response.data.key;
      this.connection.username = response.data.username;
      this.connection.password = response.data.password;
      if (autoConnect) {
        this.setExternal(
          this.connection.url,
          this.connection.key,
          this.connection.username,
          this.connection.password,
        );
        this.init();
      }
      return true;
    } catch (err) {
      console.log(err);
      console.log("Error, Configuration File doesn't exist", url);
      return false;
    }
  };

  setExternal = (url, key, uname, pword) => {
    let RSAEncrypt = new JSEncrypt();
    RSAEncrypt.setPublicKey(key);
    let token = {};
    token.username = uname;
    token.password = RSAEncrypt.encrypt(pword);
    token = btoa(JSON.stringify(token));
    //$hc.controller.url = url;
    this.connection.token = token;
    this.mode = 'external';
  };

  init = () => {
    this.connection.connectSecurity =
      location.protocol.search(/https/) !== -1 ? 'wss://' : 'ws://';
    switch (this.mode) {
      default: {
        console.log(
          'Error, Connection Type NOT Defined by controller.set functions!',
        );
        eventBus.dispatch('hcontrol.connection', {
          type: 'error',
          message: 'Type Not Set by controller.set functions!',
        });
        break;
      }
      case 'external': {
        this.hc = new WebSocket(
          this.connection.connectSecurity +
            this.connection.url +
            '?token=' +
            this.connection.token,
        );
        this.bindEvents();
        break;
      }
      case 'internal': {
        eventBus.dispatch(
          'websocket.connect',
          this.wsType +
            this.location.host +
            ':' +
            this.location.port +
            this.location.path,
        );
        break;
      }
    }
  };

  /**
   * @todo need to  find a way to bind websocket events in this service and remove it from hook
   * getWebSocket is returning null
   */
  bindEvents = () => {
    this.hc.onmessage = (message) => {
      eventBus.dispatch('hcontrol.log', {
        direction: 'in',
        msgType: message.data.split(/(?<=^\S+)\s/)[0],
        data: JSON.parse(message.data.split(/(?<=^\S+)\s/)[1]),
      });

      this.parseResponse(message);
    };
    this.hc.onopen = () => {
      eventBus.dispatch('hcontrol.connection', {
        type: 'connection',
        message: 'connected',
      });
      this.keepAliveSend();
    };
    this.hc.onclose = () => {
      console.log('onclose');
      eventBus.dispatch('hcontrol.connection', {
        type: 'connection',
        message: 'disconnected',
      });
      if (!this.closeAllow) {
        // this.hc.reconnect();
      }
    };
    this.hc.onerror = (error) => {
      eventBus.dispatch('hcontrol.connection', {
        type: 'connection',
        message: 'error',
      });
      console.log('Connection Error', error);
    };
  };

  close = function () {
    eventBus.dispatch('hcontrol.connection', {
      type: 'connection',
      message: 'closed',
    });
    this.closeAllow = true;
    this.hc.close();
  };

  keepAliveSend = () => {
    clearTimeout(this.keepAlive.to);
    this.keepAlive.to = setInterval(() => {
      let disco = { params: this.params };
      this.send('disco ' + JSON.stringify(disco));
    }, this.keepAlive.interval);
  };

  send = (str) => {
    if (this.hc.readyState === 1) {
      eventBus.dispatch('hcontrol.log', {
        direction: 'out',
        msgType: str.split(/(?<=^\S+)\s/)[0],
        data: JSON.parse(str.split(/(?<=^\S+)\s/)[1]),
      });
      this.hc.send(str);
    }
    this.keepAliveSend(); // @TODO
  };

  // getAuth = () => {
  //     $hc.getAuth = function(){
  //         let disco = {"params":["auth"]};
  //         $hc.controller.send('disco ' + JSON.stringify(disco));
  //     }
  // }

  /************** HCONTROL ************/

  getButton = (port, channel, property) => {
    port = port === undefined ? 0 : port;
    channel = channel === undefined ? 0 : channel;
    property = property === undefined ? 'channel' : property;

    let cmd = 'get ';
    let details = {
      path: '/button/' + port + '/' + channel + '/' + property,
    };
    this.send(cmd + JSON.stringify(details));
  };

  getLevel = (port, level, property) => {
    port = port === undefined ? 0 : port;
    level = level === undefined ? 0 : level;
    property = property === undefined ? 'level' : property;

    let cmd = 'get ';
    let details = {
      path: '/level/' + port + '/' + level + '/' + property,
    };

    this.send(cmd + JSON.stringify(details));
  };

  getPage = () => {
    let cmd = 'get ';
    let details = {
      path: '/page/emulator',
      //value: true
    };
    this.send(cmd + JSON.stringify(details));
  };

  getPassThru = (items) => {};

  getFile = (filePath) => {
    let cmd = 'getfile ';
    let details = {
      path: filePath,
      state: 'begin',
    };

    this.send(cmd + JSON.stringify(details));
  };

  setButton = (port, channel, value) => {
    port = port === undefined ? 1 : port;
    channel = channel === undefined ? 1 : channel;
    value = this.conformChannelValue(value);
    let cmd = 'set ';
    let details = {
      path: '/button/' + port + '/' + channel + '/button',
      value: value,
    };
    this.send(cmd + JSON.stringify(details));
  };
  conformChannelValue = (value) => {
    let pushEvent = [
      1,
      '1',
      true,
      'on',
      'push',
      'pushed',
      'press',
      'pressed',
      'go',
    ];
    let releaseEvent = [
      0,
      '0',
      false,
      'off',
      'release',
      'released',
      'stop',
      'not pressed',
    ];
    if (pushEvent.indexOf(value.toLowerCase()) !== -1) {
      value = 'press';
    } else if (releaseEvent.indexOf(value.toLowerCase()) !== -1) {
      value = 'release';
    } else {
      console.log('VALUE NOT CONFORMED:' + value);
      value = 'press';
    }
    return value;
  };

  setLevel = (port, level, value) => {
    port = port === undefined ? 1 : port;
    level = level === undefined ? 1 : level;
    value = value === undefined ? 125 : value;
    value > 255 ? (value = 255) : value < 0 ? (value = 0) : value;

    let cmd = 'set ';
    let details = {
      path: '/level/' + port + '/' + level + '/level',
      value: value,
    };
    this.send(cmd + JSON.stringify(details));
  };

  setPassThru = (items) => {};

  parseFileResponse = (message) => {
    try {
      let type = message.data.split(' ')[0].replace('@', '').trim();
      let obj = message.data.split(' ')[1];
      obj = JSON.parse(obj);

      if (type === 'getfile' && obj.state === 'begin') {
        this.tFile = '';
      } else if (type === 'block') {
        this.tFile += obj.data;
      }
      clearTimeout(this.pfTO);
      this.pfTO = setTimeout(() => {
        //console.log('pfto');
        this.tFile = atob(this.tFile);
        eventBus.dispatch('hcontrol.file', this.tFile);
      }, 150);
    } catch (error) {
      // $hc.log.message('error',{path:"Error Parsing File - check console","value":"error"});
      console.log(
        'PARSE FILE RESPONSE ERROR: - hcontrol return',
        message.data,
        error,
      );
    }
  };

  parseResponse = (message) => {
    try {
      //console.log('Incoming Message:',message);
      let type = message.data
        .split(/(?<=^\S+)\s/)[0]
        .replace('@', '')
        .trim();
      let obj = message.data.split(/(?<=^\S+)\s/)[1];

      if (type === 'disco') {
        let obj = message.data.split('@disco')[1];
        obj = JSON.parse(obj);
        if (obj.auth !== undefined) {
          let authObj = {
            warn: obj.auth.warn,
            reason: obj.auth.reason,
            mode: obj.auth.mode,
          };
          //Delay for initial load of template/and/or footer
          setTimeout(() => {
            this.hcBroadcast.auth(authObj);
          }, 750);
        }
      } else {
        obj = JSON.parse(obj);
        if (type === 'block' || type === 'getfile') {
          this.parseFileResponse(message);
        } else {
          if (Array.isArray(obj)) {
            for (var rx of obj) {
              this.conformBroadcast(type, rx.path, rx.value);
              //$hc.log.message('in',{path:rx.path,value:rx.value});
            }
          } else {
            if (obj.version !== undefined) {
              //Handle DISCO response?
            } else {
              this.conformBroadcast(type, obj.path, obj.value);
            }
          }
        }
      }
    } catch (error) {
      console.log(
        'PARSE RESPONSE ERROR: - hcontrol return',
        message.data,
        error,
      );
      console.log(message.data);
      this.errorMessage = message.data;
    }
  };

  conformBroadcast = function (type, path, value) {
    if (type == 'publish' || type == 'get') {
      path = path.split('/');
      let bcType = path[1];
      let bcPort = path[2];
      let bcElem = path[3];
      let bcProperty = path[4];
      let bcVal = value;

      switch (bcType) {
        default: {
          this.hcBroadcast[bcType][bcProperty](bcPort, bcElem, bcVal);
          break;
        }
        case 'page': {
          this.hcBroadcast[bcType](bcPort);
          break;
        }
      }
    }
  };
}
