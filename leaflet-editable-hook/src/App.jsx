import L from 'leaflet';
import 'leaflet-editable';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Analytics } from '@vercel/analytics/react';
import ControlBar from './ControlBar';

function App() {
  return (
    <div style={{ width: '100vw' }}>
      <MapContainer
        center={[22.6469, -102.988]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100vh', width: '100%' }}
        editable={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ControlBar />
      </MapContainer>
      <Analytics />
    </div>
  );
}

export default App;
