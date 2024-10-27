import { Feature } from "ol";
import type { ObjectWithGeometry } from "ol/Feature";
import { LineString, type Geometry } from "ol/geom";

export class Connection extends Feature {
    connection: any;
    constructor(data: any, geometryOrProperties: Geometry | ObjectWithGeometry<Geometry> = {}) {
        const startCoordinates = [data.airports[0].longitude, data.airports[0].latitude];
        const endCoordinates = [data.airports[1].longitude, data.airports[1].latitude];
        super({ ...geometryOrProperties, geometry: new LineString([startCoordinates, endCoordinates]) });
        this.connection = data;
    }
}