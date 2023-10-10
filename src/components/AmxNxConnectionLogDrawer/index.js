/* eslint-disable */
import './index.scss';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Offcanvas } from 'react-bootstrap';
import AmxNxLog from '../AmxNxLog';
import eventBus from '../../lib/eventBus';
import {
  connectionLogMessage,
  logConfig,
  logMessage,
} from '../../utils/logMessage';

const AmxNxConnectionLogDrawer = (props) => {
  const [messages, setMessages] = useState([]);

  const handleClose = useCallback(() => {
    if (props.onHide) {
      props.onHide(true);
    }
  });

  useEffect(() => {
    bindConnectionEvents();
    bindLogEvents();
  }, []);

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

  const addItem = useCallback((data) => {
    let msgs = messages;
    msgs.unshift(data);
    if (msgs.length > logConfig.maxItems) {
      msgs.pop();
    }
    setMessages(JSON.parse(JSON.stringify(msgs)));
  });

  const clearLog = () => {
    setMessages(JSON.parse(JSON.stringify([])));
  };

  return (
    <Offcanvas
      show={props.show}
      placement="end"
      onHide={handleClose}
      className="connection-log-drawer"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Connection</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='p-0'>
        <Card className="h-100 border-0">
          <Card.Body className='pb-0'>
            <Card.Title>Log File:</Card.Title>
            <AmxNxLog messages={messages} />
          </Card.Body>
          <Card.Footer>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <Button variant="primary" onClick={clearLog}>
                  Clear Log
                </Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AmxNxConnectionLogDrawer;
