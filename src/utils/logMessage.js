/* eslint-disable */

const getTime = () => {
  return new Date().toLocaleTimeString().split(' ')[0];
};

export const logConfig = {
  inIcon: 'bi bi-arrow-right',
  outIcon: 'bi bi-arrow-left',
  connectIcon: 'bi bi-activity',
  maxItems: 50,
};

export const connectionLogMessage = (data, log) => {
  let i = {};
  switch (data.message) {
    case 'connected': {
      i = {
        icon: log.connectIcon + ' text-success',
        time: getTime(),
        path: 'connection',
        value: true,
      };
      break;
    }
    case 'disconnected': {
      i = {
        icon: log.connectIcon,
        time: getTime(),
        path: 'connection',
        value: false,
      };
      break;
    }
    case 'error': {
      i = {
        icon: log.connectIcon + ' text-warning',
        time: getTime(),
        path: 'connection',
        value: 'error',
      };
      break;
    }
    case 'closed': {
      i = {
        icon: log.connectIcon + ' text-warning',
        time: getTime(),
        path: 'connection',
        value: 'closed',
      };
      break;
    }
  }
  return i;
};

export const logMessage = (data, log) => {
  let i = {};
  switch (data.direction) {
    case 'in': {
      if (data.msgType !== '@disco') {
        i = {
          icon: log.inIcon,
          msgType: data.msgType,
          time: getTime(),
          path: data.data.path,
          value: data.data.value,
        };
      }
      break;
    }
    case 'out': {
      i = {
        icon: log.outIcon,
        msgType: data.msgType,
        time: getTime(),
        path: data.data.path,
        value: data.data.value,
      };
    }
  }
  return i;
};
