/* eslint-disable */
import { useCallback, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import AmxNxButton from '../AmxNxButton';
import AmxNxCheckbox from '../AmxNxCheckbox';
import AmxNxSlider from '../AmxNxSlider';
import AmxNxMeter from '../AmxNxMeter';
import AmxNxLevel from '../AmnxLevel';

const AmxNxEmulator = (props) => {
  const [btnProp, setBtnProps] = useState({
    port: 10,
    channel: 1000,
    text: 'Button Text',
    icon: 'bi bi-bar-chart-fill',
  });

  const [cbProps, setCbProps] = useState({
    port: 1,
    channel: 100,
    text: 'This is the Label',
    labelVisible: true,
    switch: false,
  });

  const [lvlProps, setLvlProps] = useState({
    port: 1,
    level: 1,
    setValue: 255
  });

  const handleBtnPropChange = useCallback((value, key) => {
    setBtnProps((prev) => ({
      ...prev,
      [key]: value,
    }));
  });

  const handleCBPropChange = useCallback((value, key) => {
    setCbProps((prev) => ({
      ...prev,
      [key]: value,
    }));
  });

  const handleLevelChange = useCallback((value, key) => {
    setLvlProps((prev) => ({
      ...prev,
      [key]: value,
    }));
  });

  return (
    <Form>
      <div className="border bg-grey p-3 mb-4">
        <Row className="gx-0">
          <Col className="col-6 pe-2">
            <Form.Group as={Row} className="align-items-center gx-0">
              <Form.Label column sm="4" className="p-0">
                Port:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={btnProp.port}
                  onChange={(e) => handleBtnPropChange(e.target.value, 'port')}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col className="col-6 ps-2">
            <Form.Group as={Row} className="align-items-center gx-0">
              <Form.Label column sm="5" className="p-0">
                Channel:
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  value={btnProp.channel}
                  onChange={(e) =>
                    handleBtnPropChange(e.target.value, 'channel')
                  }
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className="gx-0 py-3">
          <Col className="d-flex justify-content-center">
            <AmxNxButton configuration={btnProp} />
          </Col>
        </Row>

        <Row className="gx-0">
          <Col className="col-6 pe-2">
            <Form.Group as={Row} className="align-items-center gx-0">
              <Form.Label column sm="4" className="p-0">
                Port:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={cbProps.port}
                  onChange={(e) => handleCBPropChange(e.target.value, 'port')}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col className="col-6 ps-2">
            <Form.Group as={Row} className="align-items-center gx-0">
              <Form.Label column sm="5" className="p-0">
                Channel:
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  value={cbProps.channel}
                  onChange={(e) =>
                    handleCBPropChange(e.target.value, 'channel')
                  }
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className="gx-0 pt-3">
          <Col className="d-flex justify-content-center">
            <AmxNxCheckbox configuration={cbProps} />
          </Col>
        </Row>
      </div>

      <div className="border bg-grey p-3">
        <Form.Group as={Row} className="align-items-center gx-0">
          <Form.Label column sm="12" className="p-0">
            Port:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              type="text"
              value={lvlProps.port}
              onChange={(e) => handleLevelChange(e.target.value, 'port')}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center gx-0 mb-2">
          <Form.Label column sm="12" className="p-0">
            Level:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              type="text"
              value={lvlProps.level}
              onChange={(e) => handleLevelChange(e.target.value, 'level')}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center gx-0 mb-2">
          <Form.Label column sm="12" className="p-0">
            Current Value:
          </Form.Label>
          <Col sm="12">
            <AmxNxLevel configuration={lvlProps} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center gx-0 mb-2">
          <Form.Label column sm="12" className="p-0">
            Current Value:
          </Form.Label>
          <Col sm="12">
            <AmxNxMeter configuration={lvlProps} />
          </Col>
        </Form.Group>
      </div>
    </Form>
  );
};

export default AmxNxEmulator;
