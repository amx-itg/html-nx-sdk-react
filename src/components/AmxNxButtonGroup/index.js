/* eslint-disable */
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import AmxNxButton from '../AmxNxButton';

const AmxNxButtonGroup = (props) => {
  const [groupConfig, setGroupConfiguration] = useState(null);

  useEffect(() => {
    let group = (props.configuration !== undefined) ? props.configuration : {};
    if (group.port === undefined) { group.port = 1 }
    if (group.btns === undefined) { group.btns = [] }

    group._dir = (group.direction !== undefined) ? group.direction : "button-group";
    setGroupConfiguration(group);

  }, [props.configuration]);
  if (!groupConfig) return null;

  return (
    <ButtonGroup>
      {groupConfig.btns.map((btn, index) => {
        return (
          <AmxNxButton
            configuration={{ ...btn, ...{ port: groupConfig.port } }}
            key={index}
          ></AmxNxButton>
        );
      })}
    </ButtonGroup>
  );
};

export default AmxNxButtonGroup;
