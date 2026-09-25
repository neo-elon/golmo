// Geolocation calculation and geofencing utilities

/**
 * Calculates distance in meters between two lat/lng coordinates using the Haversine formula
 */
export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Checks if user is inside a stop's geofence circle
 */
export function isUserInGeofence(userLat, userLng, stopLat, stopLng, radiusMeters = 25) {
  const distance = calculateDistanceMeters(userLat, userLng, stopLat, stopLng);
  return {
    isInside: distance <= radiusMeters,
    distanceMeters: distance
  };
}

/**
 * Pretty formats distance (e.g. 15 m or 1.2 km)
 */
export function formatDistance(meters) {
  if (meters === null || meters === undefined) return "--";
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Formats seconds into MM:SS
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Generates intermediate walking waypoints between stops for simulated walking
 */
export function generateWalkingRoute(stops, pointsPerSegment = 12) {
  const route = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const start = stops[i];
    const end = stops[i + 1];

    for (let step = 0; step < pointsPerSegment; step++) {
      const progress = step / pointsPerSegment;
      route.push({
        lat: start.lat + (end.lat - start.lat) * progress,
        lng: start.lng + (end.lng - start.lng) * progress,
        approachingStopId: end.id,
        currentStopId: start.id
      });
    }
  }
  // Add final stop
  if (stops.length > 0) {
    const last = stops[stops.length - 1];
    route.push({
      lat: last.lat,
      lng: last.lng,
      approachingStopId: null,
      currentStopId: last.id
    });
  }
  return route;
}
