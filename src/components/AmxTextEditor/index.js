/* eslint-disable */

import { SimpleMdeReact } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useCallback, useEffect, useState } from 'react';

const AmxTextEditor = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = useCallback((value) => {
    setValue(value);
    if (props.onChangeValue) {
      props.onChangeValue(value);
    }
  }, []);

  return (
    <SimpleMdeReact
      value={value}
      options={props.options || {}}
      onChange={onChange}
    />
  );
};

export default AmxTextEditor;
