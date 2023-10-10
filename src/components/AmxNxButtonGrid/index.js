/* eslint-disable */
import { useEffect, useState } from 'react';
import AmxNxButton from '../AmxNxButton';

const AmxNxButtonGrid = (props) => {
  const [gridConfig, setGridConfiguration] = useState(null);

  useEffect(() => {
    let grid = props.configuration ? props.configuration : {};
    if (grid.port === undefined) { grid.port = 1 }
    if (grid.btns === undefined) { grid.btns = [] }

    grid.size = (grid.gridSize !== undefined) ? Math.ceil(12 / grid.gridSize) : 4;
    grid.marginX = (grid.gridMarginX !== undefined) ? grid.gridMarginX : 1;
    grid.marginY = (grid.gridMarginY !== undefined) ? grid.gridMarginY : 1;
    grid.justify = (grid.gridJustify !== undefined) ? grid.gridJustify : 'center';
    setGridConfiguration(grid);
  }, [props.configuration]);

  if (!gridConfig) return null;

  return (
    <div
      className={`row g-2 justify-content-${gridConfig.justify} gx-${gridConfig.gridMarginX} gy-${gridConfig.gridMarginY}`}
    >
      {gridConfig.btns.map((btn, index) => {
        return (
          <div
            className={`col-${gridConfig.size} d-flex justify-content-center`}
            key={index}
          >
            <AmxNxButton
              configuration={{ ...btn, ...{ port: gridConfig.port } }}
            ></AmxNxButton>
          </div>
        );
      })}
    </div>
  );
};

export default AmxNxButtonGrid;
