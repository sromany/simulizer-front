import { Feature } from "ol";
import type { ObjectWithGeometry } from "ol/Feature";
import { Geometry, Point } from "ol/geom";

export class AirportMarker extends Feature {
    airport: any
    constructor(data: any, geometryOrProperties: Geometry | ObjectWithGeometry<Geometry> = {}) {
        const coordinates = [data.longitude, data.latitude];
        super({ ...geometryOrProperties, geometry: new Point(coordinates) });
        this.airport = data;
    }
}