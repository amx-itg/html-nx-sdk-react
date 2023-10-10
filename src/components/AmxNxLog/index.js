/* eslint-disable */

import { useCallback, useEffect, useState } from 'react';
import AmxNxScrollBar from '../AmxNxScrollBar';
import { Col, Row } from 'react-bootstrap';
import eventBus from '../../lib/eventBus';
import './index.scss';
import {
  connectionLogMessage,
  logConfig,
  logMessage,
} from '../../utils/logMessage';

const AmxNxLog = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    bindConnectionEvents();
    bindLogEvents();
  }, []);

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  const addItem = useCallback((data) => {
    let msgs = messages;
    msgs.unshift(data);
    if (msgs.length > logConfig.maxItems) {
      msgs.pop();
    }
    setMessages(JSON.parse(JSON.stringify(msgs)));
  });

  const bindConnectionEvents = useCallback(() => {
    eventBus.on('hcontrol.connection', (data) => {
      if (data.type === 'connection') {
        let i = connectionLogMessage(data, logConfig);
        addItem(i);
      }
    });
  });

  const bindLogEvents = useCallback(() => {
    eventBus.on('hcontrol.log', (data) => {
      let i = logMessage(data, logConfig);
      addItem(i);
    });
  });

  return (
    <AmxNxScrollBar >
      {messages.map((message, index) => {
        return (
          <Row className="py-1 me-0 ms-0 app-log-list" key={index}>
            <Col className="col-3 d-flex align-items-center ">
              {message.icon && <i className={message.icon}></i>}
              <span className="small ms-1">{message.time}</span>
            </Col>
            <Col className="col-6 d-flex align-items-center">
              <span className="small">
                {message.msgType} {message.path}
              </span>
            </Col>
            <Col className="col-3 d-flex align-items-center ms-auto">
              <span className="small">{message.value}</span>
            </Col>
          </Row>
        );
      })}
    </AmxNxScrollBar>
  );
};

export default AmxNxLog;
