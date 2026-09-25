import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Crosshair, MapPin } from 'lucide-react';

export default function MapViewer({
  tour,
  currentStop,
  userLocation,
  completedStopIds,
  onSelectStop,
  onMapClickLocation,
  isSimulating
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const stopMarkersRef = useRef({});
  const geofenceCirclesRef = useRef({});
  const polylineRef = useRef(null);

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialCenter = userLocation ? [userLocation.lat, userLocation.lng] : [37.5804, 126.9723];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 16,
      zoomControl: false,
      attributionControl: false
    });

    // Dark Matter tile layer (CartoDB) - Clean, aesthetic, dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Zoom control in custom location
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Click handler to teleport user in simulation
    map.on('click', (e) => {
      if (onMapClickLocation) {
        onMapClickLocation(e.latlng.lat, e.latlng.lng);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update stops and route polyline when tour changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tour || !tour.stops) return;

    // Clear existing stop markers and circles
    Object.values(stopMarkersRef.current).forEach((m) => map.removeLayer(m));
    Object.values(geofenceCirclesRef.current).forEach((c) => map.removeLayer(c));
    if (polylineRef.current) map.removeLayer(polylineRef.current);

    stopMarkersRef.current = {};
    geofenceCirclesRef.current = {};

    const latLngs = tour.stops.map((s) => [s.lat, s.lng]);

    // Draw connecting alley path
    polylineRef.current = L.polyline(latLngs, {
      color: '#ff7e36',
      weight: 3.5,
      opacity: 0.75,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Render each stop marker & geofence radius
    tour.stops.forEach((stop) => {
      const isCompleted = completedStopIds.includes(stop.id);
      const isActive = currentStop && currentStop.id === stop.id;

      // Geofence Circle
      const circle = L.circle([stop.lat, stop.lng], {
        radius: stop.radiusMeters || 25,
        color: isActive ? '#ff7e36' : isCompleted ? '#10b981' : '#f59e0b',
        fillColor: isActive ? '#ff7e36' : isCompleted ? '#10b981' : '#f59e0b',
        fillOpacity: isActive ? 0.18 : 0.08,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);

      geofenceCirclesRef.current[stop.id] = circle;

      // Custom HTML Marker Icon
      const iconHtml = `
        <div class="custom-stop-marker ${isActive ? 'current-active' : ''} ${isCompleted ? 'completed' : ''}">
          <span>${isCompleted ? '✓' : stop.order}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHtml,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          if (onSelectStop) onSelectStop(stop);
        });

      stopMarkersRef.current[stop.id] = marker;
    });
  }, [tour, completedStopIds, currentStop]);

  // Update User Location marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;

    if (!userMarkerRef.current) {
      const userIcon = L.divIcon({
        className: 'user-marker-container',
        html: `
          <div class="user-location-marker">
            <div class="user-pulse-outer"></div>
            <div class="user-pulse-center"></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(map);
    } else {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  // Re-center on user
  const handleRecenter = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.flyTo([userLocation.lat, userLocation.lng], 17, { duration: 0.8 });
    }
  };

  return (
    <div className="map-container">
      <div id="leaflet-map" ref={mapContainerRef} />

      {/* Floating Map Controls */}
      <div className="map-overlay-top-right">
        <button
          className="map-control-btn"
          onClick={handleRecenter}
          title="Recenter Map on My Location"
        >
          <Crosshair size={18} />
        </button>
      </div>
    </div>
  );
}
