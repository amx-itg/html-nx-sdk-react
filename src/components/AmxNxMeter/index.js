/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import eventBus from '../../lib/eventBus';
import { useAmxControlService } from '../../hooks/amxControlService';

const AmxNxMeter = (props) => {
  const amxControlService = useAmxControlService();
  const [meterConfig, setMeterConfiguration] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const meterRef = useRef(null);

  useEffect(() => {
    let mtr = props.configuration ? props.configuration : {};
    if (mtr.port == undefined) {
      mtr.port = 1;
    }
    if (mtr.level == undefined) {
      mtr.level = 1;
    }
    if (mtr.min == undefined) {
      mtr.min = 0;
    }
    if (mtr.max == undefined) {
      mtr.max = 255;
    }
    if (mtr.now === undefined) {
      mtr.now = 0;
    }

    if (mtr.style === undefined) {
      mtr.style = 'primary'
    } else {
      mtr.style = mtr.style.split('-')[1];
    }

    if (
      meterConfig &&
      (meterConfig.port !== props.configuration.port ||
        meterConfig.level !== props.configuration.level)
    ) {
      amxControlService.getLevel(props.configuration.port, props.configuration.level);
    }
    meterRef.current = mtr;
    setMeterConfiguration(mtr);
  }, [props.configuration]);

  useEffect(() => {
    if (meterConfig && !isInitialized) {
      amxControlService.getLevel(meterConfig.port, meterConfig.level);
      setInitialized(true);
      bindEvent();
    }

    return () => {
      eventBus.remove('channel.event');
    };
  }, [meterConfig]);

  const bindEvent = useCallback(() => {
    eventBus.on('level.event', (data) => {
      const mtr = Object.assign({}, meterRef.current);
      if (data.port == mtr.port && data.level == mtr.level) {
        let v = Math.round((data.value / mtr.max) * 100);
        mtr.now = v;
        meterRef.current = mtr;
        setMeterConfiguration(mtr);
      }
    });
  });

  if (!meterConfig) return null;

  return (
    <ProgressBar
      variant={meterConfig.style}
      now={meterConfig.now}
      min={meterConfig.min}
      max={100}
    />
  );
};

export default AmxNxMeter;
