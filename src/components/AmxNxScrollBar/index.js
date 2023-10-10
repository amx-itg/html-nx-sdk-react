/* eslint-disable */

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const AmxNxScrollBar = (props) => {
  return (
    <SimpleBar
      forceVisible={false}
      style={props.style ? props.style : { maxHeight: '30em' }}
    >
      {props.children}
    </SimpleBar>
  );
};

export default AmxNxScrollBar;
