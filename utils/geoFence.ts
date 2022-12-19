interface geoFenceOption {
  name: string;
  latitude: number;
  longitude: number;
}

interface circularGeoFenceOption extends geoFenceOption {
  radius: number; // meters
}

export class CircularGeofenceRegion {
  constructor(opts: circularGeoFenceOption) {
    Object.assign(this, opts);
  }

  inside(lat2, lon2) {
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
  constructor(opts: ) {
    Object.assign(this, opts);
  }

  inside(lat: number, lon: number) {
    const x = this.latitude;
    const y = this.longitude;
    const { axis } = this;

    return lat > x - axis && lat < x + axis && lon > y - axis && lon < y + axis;
  }
}
