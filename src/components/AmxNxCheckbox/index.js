/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAmxControlService } from '../../hooks/amxControlService';
import eventBus from '../../lib/eventBus';

const AmxNxCheckbox = (props) => {
  const amxControlService = useAmxControlService();
  const [checkboxConfig, setCheckboxConfiguration] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const checkboxRef = useRef(null);

  const getButton = useCallback((config) => {
    amxControlService.getButton(config.port, config.channel);
    amxControlService.getButton(config.port, config.channel, 'text');
    amxControlService.getButton(config.port, config.channel, 'show');
    amxControlService.getButton(config.port, config.channel, 'enable');
  });

  useEffect(() => {
    if (checkboxConfig && !isInitialized) {
      setInitialized(true);
      getButton(checkboxConfig);
      bindEvent();
    }

    return () => {
      eventBus.remove('channel.event');
    };
  }, [checkboxConfig]);

  useEffect(() => {
    let cb = props.configuration ? props.configuration : {};
    if (cb.port === undefined) {
      cb.port = 1;
    }
    if (cb.channel === undefined) {
      cb.channel = 1;
    }
    cb.labelVisible === undefined || !cb.labelVisible
      ? (cb.labelVisible = true)
      : (cb.labelVisible = false);
    if (cb.text === undefined) {
      cb.text = 'Checkbox for Port ' + cb.port + ' and channel ' + cb.channel;
    }
    cb.initText =
      cb.text !== undefined
        ? cb.text
        : 'Checkbox';
    cb.switch === undefined || cb.switch ? (cb.switch = true) : false;
    cb.inline === undefined || !cb.inline
      ? (cb.inline = false)
      : (cb.inline = true);
    cb.checked = cb.checked === undefined ? false : cb.checked;

    if (
      checkboxConfig &&
      (checkboxConfig.port !== props.configuration.port ||
        checkboxConfig.channel !== props.configuration.channel)
    ) {
      getButton(cb);
    }
    checkboxRef.current = cb;
    setCheckboxConfiguration(cb);
  }, [props.configuration]);

  const bindEvent = useCallback(() => {
    eventBus.on('channel.event', (data) => {
      const cb = Object.assign({}, checkboxRef.current);
      if (parseInt(data.port) === parseInt(cb.port)) {
        if (parseInt(cb.channel) === parseInt(data.channel)) {
          switch (data.event) {
            case 'state': {
              cb.checked = data.state;
              break;
            }
            case 'text': {
              if (data.newText !== undefined && data.newText !== '') {
                cb.text = data.newText;
              } else if (cb.initText !== cb.text || data.newText === '') {
                cb.text = cb.initText;
              }
              break;
            }
            case 'enable': {
              if (data.state) {
                cb.disabled = false;
              } else {
                cb.disabled = true;
              }
              break;
            }
            case 'show': {
              if (data.state) {
                cb.hidden = false;
              } else {
                cb.hidden = true;
              }
              break;
            }
          }
          checkboxRef.current = cb;
          setCheckboxConfiguration(cb);
        }
      }
    });
  });

  const onChange = useCallback((e) => {
    amxControlService.setButton(
      checkboxConfig.port,
      checkboxConfig.channel,
      'push',
    );
    amxControlService.setButton(
      checkboxConfig.port,
      checkboxConfig.channel,
      'release',
    );
  });

  if (!checkboxConfig) return null;

  return (
    <Form.Check
      type={checkboxConfig.switch ? 'switch' : 'checkbox'}
      inline={checkboxConfig.inline}
      id={`switch_${checkboxConfig.port || ''}_${checkboxConfig.channel || ''}`}
      label={checkboxConfig.text}
      hidden={checkboxConfig.hidden}
      disabled={checkboxConfig.disabled}
      checked={checkboxConfig.checked}
      onChange={onChange}
    />
  );
};

export default AmxNxCheckbox;
