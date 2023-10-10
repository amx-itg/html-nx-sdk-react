/* eslint-disable */
import React, { useState } from 'react';
import AmxNxButton from '../../components/AmxNxButton';
import { Card } from 'react-bootstrap';

import AmxNxButtonGrid from '../../components/AmxNxButtonGrid';
import AmxNxButtonGroup from '../../components/AmxNxButtonGroup';
import AmxNxCheckbox from '../../components/AmxNxCheckbox';
import AmxNxCBGroup from '../../components/AmxNxCBGroup';
import AmxNxRadioGroup from '../../components/AmxNxRadioGroup';

const ChannelsPage = () => {
  const [btnConfig, setBtnConfig] = useState({
    port: 2,
    channel: 501,
    text: 'Button',
    style: 'btn-secondary',
  });
  const [btnGridConfig] = useState({
    port: 2,
    gridSize: 4, //Valid Sizes 1,2,3,4,6,12
    gridMarginX: 1, //Valid Size 1 - 5;
    gridMarginY: 1, //Valid Size 1 - 5;
    justify: 'center',
    btns: [
      { channel: 502, text: 'Button', style: 'btn-primary' },
      { channel: 503, text: 'Button', style: 'btn-secondary' },
      { channel: 504, text: 'Button', style: 'btn-info' },
      { channel: 505, text: 'Button', style: 'btn-warning' },
      { channel: 506, text: 'Button', style: 'btn-danger' },
      { channel: 507, text: 'Button', style: 'btn-dark' },
      { channel: 508, text: 'Button', style: 'btn-light' },
      { channel: 509, text: 'Button', style: 'btn-link' },
      { channel: 510, text: 'Button', style: 'btn-outline-primary' },
      {
        channel: 511,
        text: 'Button',
        style: 'btn-outline-secondary rounded-pill',
      },
      { channel: 512, text: 'Button' },
      { channel: 513, text: 'Button' },
    ],
  });

  const [btnGroupConfig] = useState({
    port: 2,
    btns: [
      { channel: 514, text: 'One', icon: 'bi bi-airplane' },
      { channel: 515, text: 'Two', icon: 'bi bi-android2' },
      {
        channel: 516,
        text: 'Three',
        icon: 'bi-chat-right-dots-fill',
      },
      { channel: 517, text: 'Four', icon: 'bi bi-alarm' },
    ],
  });

  const [cbConfig] = useState({
    port: 2,
    channel: 518,
    labelVisible: true,
    text: 'This is a Checkbox',
    switch: false,
    inline: true,
  });

  const [cbGroupConfig] = useState({
    port: 2,
    switch: true,
    labelVisible: true,
    inline: false,
    checkboxes: [
      { channel: 519, text: 'ONE' },
      { channel: 520, text: 'TWO' },
      { channel: 521, text: 'THREE' },
    ],
  });

  const [radioGroupConfig] = useState({
    port: 2,
    labelVisible: true,
    inline: true,
    list: [
      { channel: 522, text: 'RADIO ONE' },
      { channel: 523, text: 'RADIO TWO' },
    ],
  });

  const [testingButtons] = useState([
    {
      port: 12,
      direction: "btn-group",
      btns: [
        { channel: 100, text: 'Show' },
        { channel: 101, text: 'Hide' },
      ]
    },
   
    {
      port: 12,
      direction: "btn-group",
      btns: [
        { channel: 104, text: 'ON' },
        { channel: 105, text: 'OFF' },
      ]
    },
    {
      port: 12,
      direction: "btn-group",
      btns: [
        { channel: 106, text: 'Set Text' }
      ]
    },
    {
      port: 12,
      direction: "btn-group",
      btns: [
        { channel: 102, text: 'Enable' },
        { channel: 103, text: 'Disable' },
      ]
    },
  ])

  return (
    <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
      <div className="col">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Single Button</Card.Title>
            <div className="d-flex justify-content-center align-items-center card-body-h-100">
              <AmxNxButton configuration={btnConfig} />
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="row">
              <div className="col-12 d-flex align-items-start justify-content-start">
              <Card.Title>Control buttons</Card.Title>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col mb-2"> <AmxNxButtonGroup configuration={testingButtons[0]}></AmxNxButtonGroup> </div>
                <div className="col mb-2"> <AmxNxButtonGroup configuration={testingButtons[1]}></AmxNxButtonGroup></div>
                <div className="col mb-2">  <AmxNxButtonGroup configuration={testingButtons[2]}></AmxNxButtonGroup></div>
                <div className="col mb-2"> <AmxNxButtonGroup configuration={testingButtons[3]}></AmxNxButtonGroup></div>
            </div>
          </Card.Footer>
        </Card>
      </div>

      <div className="col">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Multi Grid Button</Card.Title>
            <div className="d-flex justify-content-center align-items-center card-body-h-100">
              <AmxNxButtonGrid configuration={btnGridConfig} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Button Group</Card.Title>
            <div className="d-flex justify-content-center align-items-center card-body-h-100">
              <AmxNxButtonGroup configuration={btnGroupConfig} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Single Checkbox</Card.Title>
            <div className="d-flex justify-content-center align-items-center card-body-h-100">
              <AmxNxCheckbox configuration={cbConfig} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Checkbox Group</Card.Title>
            <div className="d-flex justify-content-center align-items-center card-body-h-100">
              <div>
                <AmxNxCBGroup configuration={cbGroupConfig} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Radio Group</Card.Title>
            <div className="d-flex justify-content-center align-items-center card-body-h-100">
              <div>
                <AmxNxRadioGroup configuration={radioGroupConfig} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ChannelsPage;
