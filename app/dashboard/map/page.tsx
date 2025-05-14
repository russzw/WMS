"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { darkModeMapStyle } from "@/app/lib/mapStyles";
import styles from "./test.module.css";

export default function Mapper() {
  const [markerPositions, setMarkerPositions] = useState([
    { lat: -17.820587117773236, lng: 31.02204701024367 }, // A
    { lat: -17.820836287961782, lng: 31.046514506847107 }, // B
    { lat: -17.809456, lng: 31.037992 }, // C
    { lat: -17.8040097580655, lng: 31.015817537227402 }, // D
    { lat: -17.820587113236, lng: 31.02204701367 }, // E
  ]);

  const [selectedPoints, setSelectedPoints] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const togglePointSelection = (index) => {
    setSelectedPoints((prevSelectedPoints) => {
      if (prevSelectedPoints.includes(index)) {
        return prevSelectedPoints.filter((i) => i !== index);
      } else {
        return [...prevSelectedPoints, index];
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  
  return (
    <div>
      {loading && (
        <div className={styles.loader}>
          <ClipLoader size={150} color={"#123abc"} loading={loading} />
        </div>
      )}
      <div style={{ height: "90vh", width: "100%", display: loading ? "none" : "block" }}>
        <APIProvider apiKey="AIzaSyDBSfE6Xg5BY5jSf3_gzr1V52irZGWGGos">
          <Map
            center={markerPositions[0]}
            zoom={14}
            zoomControl={false}
            styles={darkModeMapStyle}
            fullscreenControl={false}
            onTilesLoaded={() => setLoading(false)} // Hide loader when map is ready
            >
            <Directions
              positions={markerPositions}
              selectedPoints={selectedPoints}
              setRoutes={setRoutes}
              setRouteIndex={setRouteIndex}
            />
            {markerPositions.map((position, index) => (
              <Marker
              key={index}
              position={position}
              label={index !== markerPositions.length - 1 ? `Bin ${index + 1}` : undefined}
              onClick={() => togglePointSelection(index)}
            />
            ))}
          </Map>
        </APIProvider>
      </div>
      <div className={styles.buttonWrapper}>
        {markerPositions.map((_, index) => (
          <button
            key={index}
            onClick={() => togglePointSelection(index)}
            className={selectedPoints.includes(index) ? styles.selected : ""}
          >
            {index === 4 ? "Return" : `Bin ${index + 1}`}
          </button>
        ))}
      </div>
        <RouteSummary routes={routes} routeIndex={routeIndex} setRouteIndex={setRouteIndex} />
      </div>
  );
}


function Directions({ positions, selectedPoints, setRoutes, setRouteIndex }) {
  const map = useMap();
  const routeslibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (!routeslibrary || !map) return;
    setDirectionsService(new routeslibrary.DirectionsService());
    setDirectionsRenderer(new routeslibrary.DirectionsRenderer({
      map,
      suppressMarkers: true,
    }));
  }, [routeslibrary, map]);

  useEffect(() => {
    if (!directionsRenderer || !directionsService || selectedPoints.length < 2) return;

    const selectedPositions = selectedPoints.map((index) => positions[index]);
    const origin = new google.maps.LatLng(selectedPositions[0].lat, selectedPositions[0].lng);
    const destination = new google.maps.LatLng(selectedPositions[selectedPositions.length - 1].lat, selectedPositions[selectedPositions.length - 1].lng);
    const waypoints = selectedPositions.slice(1, -1).map((position) => ({
      location: new google.maps.LatLng(position.lat, position.lng),
      stopover: true,
    }));

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true, // Request multiple route options
    };

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        setRoutes(response.routes);
        directionsRenderer.setDirections(response);
      }
    });

  }, [selectedPoints, directionsService, directionsRenderer, positions, setRoutes]);

  return null;
}

function RouteSummary({ routes, routeIndex, setRouteIndex }) {
  if (!routes || !routes[routeIndex]) return null;

  const route = routes[routeIndex];
  const totalDistance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
  const totalDuration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0);

  return (
    <div className={styles.summary}>
      <h2>Route Summary</h2>
      <p>Distance: {formatDistance(totalDistance)}</p>
      <p>Duration: {formatDuration(totalDuration)}</p>
      <button onClick={() => setRouteIndex((prevIndex) => (prevIndex + 1) % routes.length)}>
        Show next route
      </button>
      <div>
        {routes.map((route, index) => (
          <button key={index} onClick={() => setRouteIndex(index)}>
            Route {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function formatDistance(distance) {
  if (distance < 1000) {
    return `${distance} meters`;
  } else {
    return `${(distance / 1000).toFixed(2)} kilometers`;
  }
}

function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours > 0 ? hours + " hours " : ""}${minutes} minutes`;
}
