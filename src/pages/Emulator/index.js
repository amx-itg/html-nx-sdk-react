/* eslint-disable */

import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import AmxNxConnectionConfig from '../../components/AmxNxConnectionConfig';
import AmxNxEmulator from '../../components/AmxNxEmulator';
import AmxNxLog from '../../components/AmxNxLog';

const EmulatorPage = () => {
  const [messages, setMessages] = useState([]);
  const clearLog = () => {
    setMessages(JSON.parse(JSON.stringify([])));
  };

  return (
    <div className="row pt-1 g-4">
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4 order-sm-3 order-xl-1">
        <AmxNxConnectionConfig />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4 order-sm-1 order-xl-2">
        <Card className="h-100">
          <Card.Body>
            <Card.Title >Emulator</Card.Title>
            <AmxNxEmulator />
          </Card.Body>
        </Card>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4 order-sm-2 order-xl-3">
        <Card className="h-100">
          <Card.Body className='pb-0'>
            <Card.Title >Log File:</Card.Title>
            <AmxNxLog messages={messages} />
          </Card.Body>
          <Card.Footer>
            <div className="row  ">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <Button variant="primary" onClick={clearLog}>
                  Clear Log
                </Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default EmulatorPage;
