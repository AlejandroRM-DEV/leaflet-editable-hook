import { FaDraftingCompass } from 'react-icons/fa';
import { Button } from 'antd';
import Control from 'react-leaflet-custom-control';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { useState } from 'react';
import { useMap } from 'react-leaflet';
import Area from './Area';
import Ruler from './Ruler';

function ControlBar() {
  const map = useMap();
  const [drawing, setDrawing] = useState(null);

  const editPolyline = () => setDrawing(drawing ? null : <Ruler />);

  const editPolygon = () => setDrawing(drawing ? null : <Area />);

  if (!map) return null;
  return (
    <>
      <Control prepend position="topright">
        <div className="leaflet-bar" style={{ backgroundColor: 'white' }}>
          <Button
            icon={<TfiRulerAlt2 color={drawing?.type === Ruler ? 'black' : 'lightgray'} />}
            type="text"
            onClick={editPolyline}
            disabled={drawing && drawing.type !== Ruler}
          />
          <hr className="w-8/12 mx-auto" />
          <Button
            icon={<FaDraftingCompass color={drawing?.type === Area ? 'black' : 'lightgray'} />}
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
