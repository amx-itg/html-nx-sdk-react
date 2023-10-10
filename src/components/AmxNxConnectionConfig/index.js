/* eslint-disable */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useAmxControlService } from '../../hooks/amxControlService';
import eventBus from '../../lib/eventBus';

const AmxNxConnectionConfig = (props) => {
  const amxControlService = useAmxControlService();
  const [connection, setConnection] = useState({
    url: '',
    key: '',
    username: '',
    password: '',
  });
  const [connectionStatusClass, setConnectionStatusClass] =
    useState('bg-danger');

  useEffect(() => {
    getConfiguration('/configuration/controller.json');
    bindEvent();
  }, []);

  const bindEvent = useCallback(() => {
    eventBus.on('hcontrol.connection', (data) => {
      if (data.type === 'connection') {
        switch (data.message) {
          case 'connected':
            setConnectionStatusClass('bg-success');
            break;
          case 'disconnected':
            setConnectionStatusClass('bg-danger');
            break;
          case 'error':
            setConnectionStatusClass('bg-warning');
            break;
        }
      }
    });
  });

  const getConfiguration = async (url) => {
    try {
      const response = await axios.get(url);
      setConnection(response.data);
    } catch (err) {
      console.log("Error, Configuration File doesn't exist");
    }
  };

  const handleChange = useCallback((value, key) => {
    setConnection((prev) => ({
      ...prev,
      [key]: value,
    }));
  });

  const connect = useCallback(() => {
    console.log('connectconnect');
    amxControlService.setExternal(
      connection.url,
      connection.key,
      connection.username,
      connection.password,
    );
    amxControlService.init();
  });

  const disconnect = useCallback(() => {
    amxControlService.close();
  });

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>
          External Connection
          <span
            className={`float-end p-2 mt-1 border border-light rounded-circle ${connectionStatusClass}`}
          ></span>
        </Card.Title>
        <div>
          <Form>
            <Form.Group as={Row} className="align-items-center mb-2 gx-0">
              <Form.Label column sm="3" className="p-0">
                Controller Address:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={connection.url}
                  onChange={(e) => handleChange(e.target.value, 'url')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center mb-2 gx-0">
              <Form.Label column sm="3" className="p-0">
                Security Key:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as={'textarea'}
                  value={connection.key}
                  onChange={(e) => handleChange(e.target.value, 'key')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center mb-2 gx-0">
              <Form.Label column sm="3" className="p-0">
                Username:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={connection.username}
                  onChange={(e) => handleChange(e.target.value, 'username')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center mb-2 gx-0">
              <Form.Label column sm="3" className="p-0">
                Password:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  value={connection.password}
                  onChange={(e) => handleChange(e.target.value, 'password')}
                />
              </Col>
            </Form.Group>
          </Form>
          <div className="row justify-content-end mt-4">
            <div className="col-8 d-flex justify-content-end">
              <Button
                type="button"
                variant="success"
                className="me-3"
                onClick={connect}
              >
                Connect
              </Button>
              <Button type="button" variant="danger" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AmxNxConnectionConfig;
