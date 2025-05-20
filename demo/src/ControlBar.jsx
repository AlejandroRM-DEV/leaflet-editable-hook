import { FaDraftingCompass } from 'react-icons/fa';
import { Button } from 'antd';
import Control from './Control';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { useState } from 'react';
import Area from './Area';
import Ruler from './Ruler';

function ControlBar() {
  const [drawing, setDrawing] = useState(null);

  const editPolyline = () => setDrawing(drawing ? null : <Ruler />);

  const editPolygon = () => setDrawing(drawing ? null : <Area />);

  return (
    <>
      <Control prepend position="topright">
        <div className="leaflet-bar" style={{ backgroundColor: 'white' }}>
          <Button
            icon={<TfiRulerAlt2 color={drawing?.type === Ruler ? 'blue' : 'black'} />}
            type="text"
            onClick={editPolyline}
            disabled={drawing && drawing.type !== Ruler}
          />
          <Button
            icon={<FaDraftingCompass color={drawing?.type === Area ? 'blue' : 'black'} />}
            type="text"
            onClick={editPolygon}
            disabled={drawing && drawing.type !== Area}
          />
        </div>
      </Control>
      {drawing}
    </>
  );
}

export default ControlBar;
