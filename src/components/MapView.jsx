import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import TouristForm from './TouristForm';

if (!maplibregl.supported) maplibregl.supported = () => true;

const MapView = ({ tourists = [], onAddTourist, onAlert, dangerZone }) => {
  const [localTourists, setLocalTourists] = useState(tourists);
  const [viewState, setViewState] = useState({
    longitude: 88.4030,
    latitude: 22.5130,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  // 🔵 Fetch live locations from backend every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('https://ovenlike-adroitly-alyson.ngrok-free.dev/api/tourists');
        const data = await res.json();
        setLocalTourists(data); // expects [{id, lat, lng, status}]
      } catch (err) { console.log('Failed to fetch tourists', err); }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isPointInPolygon = (point, polygon) => {
    let x = point.lng, y = point.lat, inside = false;
    for (let i = 0, j = polygon.length-1; i<polygon.length; j=i++){
      let xi=polygon[i][0], yi=polygon[i][1];
      let xj=polygon[j][0], yj=polygon[j][1];
      let intersect = ((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi);
      if(intersect) inside=!inside;
    }
    return inside;
  };

  const checkAndAddAlert = (tourist) => {
    if (!dangerZone?.features) return;
    for (const zone of dangerZone.features) {
      const polygon = zone.geometry.coordinates[0];
      if (isPointInPolygon({ lat: tourist.lat, lng: tourist.lng }, polygon)) {
        onAlert?.({
          id: `A${Date.now()}`,
          touristId: tourist.id,
          type: "Entered Danger Zone",
          time: new Date().toLocaleTimeString(),
          lat: tourist.lat,
          lng: tourist.lng,
          zone: zone.properties?.name,
        });
        break;
      }
    }
  };

  const handleAddTourist = (newTourist) => {
    const t = { id: Date.now(), lng: parseFloat(newTourist.lng), lat: parseFloat(newTourist.lat), status: newTourist.status };
    setLocalTourists(prev => [...prev, t]);
    setViewState({ ...viewState, longitude: t.lng, latitude: t.lat, zoom: 14 });
    checkAndAddAlert(t);
    onAddTourist?.(t);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ width: '300px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <TouristForm onAddTourist={handleAddTourist} />
      </div>
      <div style={{ flex: 1 }}>
        <Map

          mapLib={maplibregl}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        >
          {localTourists.map(t => (
            <Marker key={t.id} longitude={t.lng} latitude={t.lat} anchor='center'>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor:
                    t.status === 'SOS'
                      ? '#ef4444'
                      : t.status === 'Caution'
                      ? '#f59e0b'
                      : '#059669',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                }}
                title={`ID: ${t.id}`}
              >
                {t.status[0]}
              </div>
            </Marker>
          ))}

          {dangerZone && (
            <Source id="danger" type="geojson" data={dangerZone}>
              <Layer
                id="danger-fill"
                type="fill"
                paint={{ "fill-color": "#ef4444", "fill-opacity": 0.2 }}
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};

export default MapView;
