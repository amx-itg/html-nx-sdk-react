/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAmxControlService } from '../../hooks/amxControlService';
import eventBus from '../../lib/eventBus';

const AmxNxRadio = (props) => {
  const amxControlService = useAmxControlService();
  const [radioConfig, setRadioConfiguration] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const radioRef = useRef(null);

  useEffect(() => {
    if (radioConfig && !isInitialized) {
      setInitialized(true);
      getButton(radioConfig);
      bindEvent();
    }

    return () => {
      eventBus.remove('channel.event');
    };
  }, [radioConfig]);

  const getButton = useCallback((config) => {
    amxControlService.getButton(config.port, config.channel);
    amxControlService.getButton(config.port, config.channel, 'text');
    amxControlService.getButton(config.port, config.channel, 'show');
    amxControlService.getButton(config.port, config.channel, 'enable');
  });

  const bindEvent = useCallback(() => {
    eventBus.on('channel.event', (data) => {
      const radio = Object.assign({}, radioRef.current);
      if (parseInt(data.port) === parseInt(radio.port)) {
        if (parseInt(radio.channel) === parseInt(data.channel)) {
          switch (data.event) {
            case 'state': {
              radio.checked = !!data.state;
              break;
            }
            case 'text': {
              if (data.newText !== undefined && data.newText !== '') {
                radio.text = data.newText;
              } else if (radio.initText !== radio.text || data.newText === '') {
                radio.text = radio.initText;
              }
              break;
            }
            case 'enable': {
              if (data.state) {
                radio.disabled = false;
              } else {
                radio.disabled = true;
              }
              break;
            }
            case 'show': {
              if (data.state) {
                radio.hidden = false;
              } else {
                radio.hidden = true;
              }
              break;
            }
          }
          radioRef.current = radio;
          setRadioConfiguration(radio);
        }
      }
    });
  });

  const onChange = useCallback(() => {
    amxControlService.setButton(radioConfig.port, radioConfig.channel, 'push');
    amxControlService.setButton(
      radioConfig.port,
      radioConfig.channel,
      'release',
    );
  });

  useEffect(() => {
    let radio = props.configuration ? props.configuration : {};
    if (radio.port === undefined) {
      radio.port = 1;
    }
    if (radio.channel === undefined) {
      radio.channel = 1;
    }
    radio.initText =
      radio.text !== undefined
        ? radio.text
        : 'Radio';
    radio.labelVisible === undefined || !radio.labelVisible
      ? (radio.labelVisible = true)
      : (radio.labelVisible = false);
    radio.inline === undefined || !radio.inline
      ? (radio.inline = false)
      : (radio.inline = true);
    radio.checked = radio.checked === undefined ? false : radio.checked;
    setRadioConfiguration(radio);
    radioRef.current = radio;
  }, [props.configuration]);
  if (!radioConfig) return null;

  return (
    <Form.Check
      type="radio"
      inline={radioConfig.inline}
      id={`switch_${radioConfig.port || ''}_${radioConfig.channel || ''}`}
      label={radioConfig.text}
      hidden={radioConfig.hidden}
      disabled={radioConfig.disabled}
      checked={radioConfig.checked}
      onChange={() => onChange()}
    />
  );
};

export default AmxNxRadio;
