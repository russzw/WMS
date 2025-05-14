// // components/WasteMap.js
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix leaflet icon issue with Webpack
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// //{ lat: -17.820587117773236, lng: 31.02204701024367 }, // A

// const WasteMap = ({ wasteData }) => {
//   return (
//     <MapContainer center={[-17.820587117773236, 31.02204701024367]} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {wasteData.map((data, idx) => (
//         <Marker key={idx} position={[data.lat, data.lng]}>
//           <Popup>
//             {data.description}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default WasteMap;

// components/WasteMap.js
import { MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { useEffect } from 'react';

// Fix leaflet icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const WasteMap = ({ wasteData, heatmapData, polygonData }) => {
  useEffect(() => {
    const map = L.map('map').setView([-17.82, 31.04], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    wasteData.forEach(data => {
      L.marker([data.lat, data.lng])
        .addTo(map)
        .bindPopup(data.description);
    });

    L.heatLayer(heatmapData, { radius: 25 }).addTo(map);

    if (polygonData) {
      const geoJsonLayer = L.geoJSON(polygonData, {
        style: {
          color: 'red',
        }
      }).addTo(map);
    }

    // Disable zoom and dragging
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    if (map.tap) map.tap.disable();

    return () => {
      map.remove();
    };
  }, [wasteData, heatmapData, polygonData]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default WasteMap;


