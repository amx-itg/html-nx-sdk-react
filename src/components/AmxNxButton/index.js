/* eslint-disable */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAmxControlService } from '../../hooks/amxControlService';
import eventBus from '../../lib/eventBus';

const AmxNxButton = (props) => {
  const amxControlService = useAmxControlService();
  const [btnConfig, setBtnConfiguration] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    let btn = props.configuration ? props.configuration : {};
    btn.initText =
      props.configuration.text !== undefined
        ? props.configuration.text
        : 'Button';
    if (
      btnConfig &&
      (btnConfig.port !== props.configuration.port ||
        btnConfig.channel !== props.configuration.channel)
    ) {
      getButton(btn);
    }
    btnRef.current = btn;
    setBtnConfiguration(btn);
  }, [props.configuration]);

  useEffect(() => {
    if (btnConfig && !isInitialized) {
      setInitialized(true);
      getButton(btnConfig);
      bindEvent();
    }

    return () => {
      eventBus.remove('channel.event');
    };
  }, [btnConfig]);

  const bindEvent = useCallback(() => {
    eventBus.on('channel.event', (data) => {
      const btn = Object.assign({}, btnRef.current);
      if (parseInt(data.port) === parseInt(btn.port)) {
        if (parseInt(btn.channel) === parseInt(data.channel)) {
          switch (data.event) {
            case 'state': {
              if (data.state) {
                btn.active = true;
              } else {
                btn.active = false;
              }
              break;
            }
            case 'text': {
              if (data.newText !== undefined && data.newText !== '') {
                btn.oldText = btn.text;
                btn.text = data.newText;
              } else if (btn.initText !== btn.text || data.newText === '') {
                btn.text = btn.initText;
              }
              break;
            }
            case 'enable': {
              if (data.state) {
                btn.disabled = false;
              } else {
                btn.disabled = true;
              }
              break;
            }
            case 'show': {
              if (data.state) {
                btn.hidden = false;
              } else {
                btn.hidden = true;
              }
              break;
            }
          }
          btnRef.current = btn;
          setBtnConfiguration(btn);
        }
      }
    });
  }, []);

  const getButton = useCallback((config) => {
    amxControlService.getButton(config.port, config.channel, 'show');
    amxControlService.getButton(config.port, config.channel, 'enable');
    amxControlService.getButton(config.port, config.channel, 'text');
    amxControlService.getButton(config.port, config.channel);
  });

  const setButton = useCallback((event) => {
    amxControlService.setButton(btnConfig.port, btnConfig.channel, event);
    return false;
  });

  if (!btnConfig) return null;

  return (
    <button
      id={`btn_${btnConfig.port || ''}_${btnConfig.channel || ''}`}
      type="button"
      className={`btn ${btnConfig.style ? btnConfig.style : 'btn-primary'} ${btnConfig.active ? 'active' : ''
        } ${btnConfig.disabled ? 'disabled' : ''} ${btnConfig.hidden ? 'visually-hidden' : ''
        }`}
      onTouchStart={() => setButton('push')}
      onMouseDown={() => setButton('push')}
      onTouchCancel={() => setButton('release')}
      onTouchEnd={() => setButton('release')}
      onMouseUp={() => setButton('release')}
      onContextMenu={(e) => {e.preventDefault(); return false;}}
    >
      {btnConfig.icon && <i className={`${btnConfig.icon} me-2`}></i>}
      {btnConfig.text}
    </button>
  );
};

export default AmxNxButton;
