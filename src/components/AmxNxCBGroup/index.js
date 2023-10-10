/* eslint-disable */
import { useEffect, useState } from 'react';
import AmxNxCheckbox from '../AmxNxCheckbox';

const AmxNxCBGroup = (props) => {
  const [cbGroupConfig, setbGroupConfiguration] = useState(null);

  useEffect(() => {
    let cbg = props.configuration ? props.configuration : {};
    if (cbg.port === undefined) { cbg.port = 1 }
    if (cbg.checkboxes === undefined) { cbg.checkboxes = [] }
    if (cbg.labelVisible === undefined) { cbg.labelVisible = false }
    if (cbg.switch === undefined) { cbg.switch = false }
    if (cbg.inline === undefined) { cbg.inline = false }
    setbGroupConfiguration(cbg);
  }, [props.configuration]);
  if (!cbGroupConfig) return null;

  return (
    <>
      {cbGroupConfig.checkboxes.map((cb, index) => (
        <AmxNxCheckbox
          key={index}
          configuration={{
            ...cb,
            ...{
              port: cbGroupConfig.port,
              switch: cbGroupConfig.switch,
              inline: cbGroupConfig.inline,
              labelVisible: cbGroupConfig.labelVisible
            },
          }}
        />
      ))}
    </>
  );
};

export default AmxNxCBGroup;
