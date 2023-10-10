/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';
import eventBus from '../../lib/eventBus';
import { useAmxControlService } from '../../hooks/amxControlService';

const AmxNxLevel = (props) => {
  const amxControlService = useAmxControlService();
  const [lvlConfig, setLvlConfiguration] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const lvlRef = useRef(null);

  useEffect(() => {
    let lvl = props.configuration ? props.configuration : {};
    if (lvl.port == undefined) { lvl.port = 1 }
    if (lvl.level == undefined) { lvl.level = 1 }
    if (lvl.min == undefined) { lvl.min = 0 }
    if (lvl.max == undefined) { lvl.max = 255 }
    if (lvl.changeOn == undefined) { lvl.changeOn = 'input' }
    if (lvl.currentValue === undefined) { lvl.currentValue = 0 }

    if (
      lvlConfig &&
      (lvlConfig.port !== props.configuration.port ||
        lvlConfig.level !== props.configuration.level)
    ) {
      amxControlService.getLevel(props.configuration.port, props.configuration.level);
    }
    lvlRef.current = lvl;
    setLvlConfiguration(lvl);
  }, [props.configuration]);

  useEffect(() => {
    if (lvlConfig && !isInitialized) {
      amxControlService.getLevel(lvlConfig.port, lvlConfig.level);
      setInitialized(true);
      bindEvent();
    }

    return () => {
      eventBus.remove('channel.event');
    };
  }, [lvlConfig]);

  const bindEvent = useCallback(() => {
    eventBus.on('level.event', (data) => {
      const lvl = Object.assign({}, lvlRef.current);
      if (data.port == lvl.port && data.level == lvl.level) {
        lvl.currentValue = data.value;
        lvlRef.current = lvl;
        setLvlConfiguration(lvl);
      }
    });
  });

  const onChange = useCallback((e) => {
    setLvlConfiguration(prev => ({
      ...prev,
      currentValue: e.target.value
    }))
    amxControlService.setLevel(lvlConfig.port, lvlConfig.level, e.target.value);
  })

  if (!lvlConfig) return null;

  return (
    <Form.Range max={lvlConfig.max} min={lvlConfig.min} value={lvlConfig.currentValue} onChange={onChange} />
  );
};

export default AmxNxLevel;
