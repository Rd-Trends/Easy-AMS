interface geoFenceOptions {
  name: string;
  latitude: number;
  longitude: number;
}

interface circularGeoFenceOptions extends geoFenceOptions {
  radius: number; // meters
}

interface squareGeofenceOptions extends geoFenceOptions {
  axis: number; //meters
}

export class CircularGeofenceRegion {
  name: string;
  latitude: number;
  longitude: number;
  radius: number;

  constructor(options: circularGeoFenceOptions) {
    this.name = options.name;
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.radius = options.radius;
  }

  inside(lat2: number, lon2: number) {
    const lat1 = this.latitude;
    const lon1 = this.longitude;
    const R = 63710; // Earth's radius in m

    return (
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
      ) *
        R <
      this.radius
    );
  }
}

export class SquareGeofenceRegion {
  name: string;
  latitude: number;
  longitude: number;
  axis: number;

  constructor(options: squareGeofenceOptions) {
    this.name = options.name;
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.axis = options.axis;
  }

  inside(lat: number, lon: number) {
    const x = this.latitude;
    const y = this.longitude;
    const { axis } = this;

    return lat > x - axis && lat < x + axis && lon > y - axis && lon < y + axis;
  }
}
