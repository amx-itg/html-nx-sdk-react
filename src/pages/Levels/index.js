import { memo, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import AmxNxSlider from '../../components/AmxNxSlider';
import { diffObject } from '../../utils/diffObject';
import { DOUBLE_SLIDER, METER, SINGLE_SLIDER } from './constants';
import AmxNxMeter from '../../components/AmxNxMeter';

const LevelsPage = () => (
  <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 ">
    <div className="col">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>Single Level</Card.Title>
          <AmxNxSlider configuration={SINGLE_SLIDER} />
        </Card.Body>
      </Card>
    </div>

    <div className="col">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>Double Level</Card.Title>
          <AmxNxSlider configuration={DOUBLE_SLIDER} />
        </Card.Body>
      </Card>
    </div>

    <div className="col">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>Meter</Card.Title>
          <div className="d-flex justify-content-center align-items-center card-body-h-100">
            <div className="w-100">
              <AmxNxMeter configuration={METER} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
);

const arePropsEqual = (oldProps, newProps) => {
  const changedProps = diffObject(oldProps, newProps);
  return changedProps.length === 0;
};

export default memo(LevelsPage, arePropsEqual);
