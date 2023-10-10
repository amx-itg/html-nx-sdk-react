/* eslint-disable import/no-extraneous-dependencies */

import React, { forwardRef, memo, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import 'ion-rangeslider';
import { diffObject } from '../../utils/diffObject';

const IonSlider = forwardRef((props, ref) => {
  useEffect(() => {
    const options = (({ style, className, key, id, ...others }) => ({
      ...others,
      onStart: props.onStart,
      onChange: props.onChange,
      onFinish: props.onFinish,
      onUpdate: props.onUpdate,
    }))(props);
    $(ref.current).ionRangeSlider(options);
    ref.current = $(ref.current).data('ionRangeSlider');

    return () => {
      ref.current && ref.current.destroy();
    };
  }, ['']);

  return <input ref={ref} id={props.id} />;
});

IonSlider.defaultProps = {
  type: 'single',
  skin: 'flat',
};

IonSlider.propTypes = {
  /* All your PropTypes here */
};

const arePropsEqual = (oldProps, newProps) => {
  const changedProps = diffObject(oldProps, newProps);
  return Object.keys(changedProps).length === 0;
};

export default memo(IonSlider, arePropsEqual);
