/* eslint-disable */
import { useEffect, useState } from 'react';
import AmxNxRadio from '../AmxNxRadio';

const AmxNxRadioGroup = (props) => {
  const [radioGroupConfig, setradioGroupConfiguration] = useState(null);

  useEffect(() => {
    let rg = props.configuration ? props.configuration : {};

    if (rg.port === undefined) { rg.port = 1 }
    if (rg.listName === undefined) { rg.listName = "radiolist_" + Math.floor(Math.random() * Math.random() * 10000) }
    if (rg.labelVisible === undefined) { rg.labelVisible = false }
    if (rg.inline === undefined) { rg.inline = true }
    if (rg.list === undefined) { rg.list = [] }

    setradioGroupConfiguration(rg);
  }, [props.configuration]);
  if (!radioGroupConfig) return null;

  return (
    <>
      {radioGroupConfig.list.map((radio, index) => (
        <AmxNxRadio
          key={index}
          configuration={{
            ...radio,
            ...{ port: radioGroupConfig.port, inline: radioGroupConfig.inline },
          }}
        />
      ))}
    </>
  );
};

export default AmxNxRadioGroup;
