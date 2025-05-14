
"use client"

// app/page.js
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { fetchData } from '@/app/lib/adafruit';

// Load the map component dynamically to prevent SSR issues
const WasteMap = dynamic(() => import('@/app/ui/components/WasteMap'), { ssr: false });

const HomePage = () => {
  const [wasteData, setWasteData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [polygonData, setPolygonData] = useState([]);
  const val = 52;
  

  useEffect(() => {
    // Fetch waste data from an API or define some sample data
    const sampleWasteData = [
      { lat: -17.820587117773236, lng: 31.02204701024367, description: 'Bin 1: 75% full' },
      { lat: -17.820836287961782, lng: 31.046514506847107, description: 'Bin 2: 15% full' },
      { lat: -17.809456, lng: 31.037992, description: 'Bin 3: 50% full' },
      { lat: -17.8040097580655, lng: 31.015817537227402, description: `Bin 4: ${val} full` },
      { lat: -17.8189097580655, lng: 31.02581753722740, description: 'Bin 5: 60% full' },
    ];
    setWasteData(sampleWasteData);

    // Sample heatmap data: array of [lat, lng, intensity]
    const sampleHeatmapData = [
      [-17.820587117773236, 31.02204701024367, 0.5],
      [-17.809456, 31.037992, 0.8],
      [-17.8040097580655, 31.015817537227402, 0.6],
      [-17.8189097580655, 31.02581753722740, 0.7],
    ];
    setHeatmapData(sampleHeatmapData);

    // Sample polygon data: array of arrays with [lat, lng]
    const samplePolygonData = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [31.02204701024367, -17.820587117773236],
            [31.01581753722740, -17.8040097580655],
            [31.03581753722740, -17.8090097580655],
            [31.02204701024367, -17.820587117773236],
          ]
        ]
      }
    };
    setPolygonData(samplePolygonData);
  }, []);

  return (
    <div>
      <h1>Geospatial Insights for Waste Management</h1>
      <WasteMap wasteData={wasteData} heatmapData={heatmapData} polygonData={polygonData} />
    </div>
  );
};

export default HomePage;
