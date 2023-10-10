/* eslint-disable */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { IonSlider } from '../../lib';
import { diffObject } from '../../utils/diffObject';
import { useAmxControlService } from '../../hooks/amxControlService';
import eventBus from '../../lib/eventBus';
import { getOptions } from './constats';
import { parseInterger } from '../../utils/math';

const AmxNxSlider = (props) => {
  const amxControlService = useAmxControlService();
  const [configuration, setConfiguration] = useState();
  const [wasCalled, setWasCalled] = useState(false);
  const paramRef = useRef();
  const ionSliderRef = useRef();
  const bgRef = useRef();
  const sliderContainer = useRef();
  const getParams = () => paramRef.current;

  const updateConfiguration = (key, value) => {
    const newConfig = { ...configuration, [key]: value };
    setConfiguration((oldConfig = {}) => ({ ...oldConfig, ...newConfig }));
  };

  const updateParams = (key, value) => {
    const newParams = { ...paramRef.current, [key]: value };
    paramRef.current = newParams;
    updateConfiguration(key, value);
  };

  const setColor = useCallback(() => {
    const bgc = getComputedStyle(bgRef.current).backgroundColor;
    const container = sliderContainer.current;
    const params = getParams();
    if (params.type === 'single') {
      container.querySelector('.irs-bar--single').style.backgroundColor = bgc;
      container.querySelector('.irs-single').style.backgroundColor = bgc;
      container.querySelector(
        '.irs-handle > i:first-child',
      ).style.backgroundColor = bgc;
    } else if (params.type === 'double') {
      container.querySelector('.irs-bar').style.backgroundColor = bgc;
      container.querySelector('.irs-from').style.backgroundColor = bgc;
      container.querySelector('.irs-to').style.backgroundColor = bgc;
      container.querySelector('.irs-single').style.backgroundColor = bgc;
      container.querySelectorAll(
        '.irs-handle > i:first-child',
      ).forEach(node => {
        if(node) node.style.backgroundColor = bgc;
      })
    }
  });
  const onUpdate = useCallback(() => {
    setColor();
  });
  const onStart = useCallback(() => {
    const { port, type, level_1, level_2, level } = getParams();
    setColor();
    if (type === 'single') {
      amxControlService.getLevel(port, level);
    } else if (type === 'double') {
      amxControlService.getLevel(port, level_1);
      amxControlService.getLevel(port, level_2);
    }
  });
  const hctrlevent = (data) => {
    const { port, type, level_1, level_2, level, oldVal } = getParams();
    if (type === 'single') {
      amxControlService.setLevel(port, level, data.from);
    } else if (type === 'double') {
      if (data.from !== oldVal.from) {
        amxControlService.setLevel(port, level_1, data.from);
        oldVal.from = data.from;
      }
      if (data.to !== oldVal.to) {
        amxControlService.setLevel(port, level_2, data.to);
        oldVal.to = data.to;
      }
    }
  };

  const onChange = useCallback((data) => {
    const { onchange } = getParams();
    updateParams('sliding', true);
    if (onchange) {
      hctrlevent(data);
    }
  });
  const onFinish = useCallback((data) => {
    const { onfinish } = getParams();
    updateParams('sliding', false);
    if (onfinish) {
      hctrlevent(data);
    }
  });
  const callbacks = {
    onUpdate,
    onStart,
    setColor,
    hctrlevent,
    onChange,
    onFinish,
  };

  const onLevelEventChange = useCallback((data) => {
    const params = getParams();

    if (!ionSliderRef.current || !params) return;

    const { port, type, level_1, level_2, level, sliding } = params;
    const slider = ionSliderRef.current;

    if (parseInterger(data.port) === parseInterger(port)) {
      if (type === 'single') {
        if (parseInterger(data.level) === parseInterger(level)) {
          if (!sliding) {
            slider.update({ from: parseInterger(data.value) });
          }
        }
      } else if (type === 'double') {
        if (parseInterger(data.level) === parseInterger(level_1)) {
          if (!sliding) {
            slider.update({ from: parseInterger(data.value) });
          }
        } else if (parseInterger(data.level) === parseInterger(level_2)) {
          if (!sliding) {
            slider.update({ to: parseInterger(data.value) });
          }
        }
      }
    }
  }, []);

  const subscribeEvents = () => {
    eventBus.on('level.event', onLevelEventChange);
  };

  /**
   * Bind events
   * ensure that subscribeEvents must be called once.
   */
  useEffect(() => {
    if (!wasCalled) {
      subscribeEvents();
      setWasCalled(true);
    }

    return () => {
      !wasCalled && eventBus.remove('channel.event');
    };
  }, ['']);
  /**
   * set options.
   * make sure options are updated if there is any change
   */
  useEffect(() => {
    const newConfig = getOptions(props.configuration);
    const { onchange, onfinish, ...rest } = newConfig;
    setConfiguration((oldConfig = {}) => ({ ...oldConfig, ...rest }));
    paramRef.current = newConfig;
  }, [props.configuration]);

  return (
    <div ref={sliderContainer}>
      {configuration && (
        <>
          <IonSlider {...configuration} ref={ionSliderRef} {...callbacks} />
          <i className={configuration?.color} id="bgholder" ref={bgRef} />
          <div
            className={configuration?.color}
            id={`color_${configuration?.id}`}
          />
        </>
      )}
    </div>
  );
};

const arePropsEqual = (oldProps, newProps) => {
  const changedProps = diffObject(
    oldProps.configuration,
    newProps.configuration,
  );
  return Object.keys(changedProps).length === 0;
};

export default memo(AmxNxSlider, arePropsEqual);
