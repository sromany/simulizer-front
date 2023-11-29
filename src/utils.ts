import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";
import { Point } from "ol/geom";


class Options {
    fill: any; stroke: any; strokeWidth: any; size: any;
    static default = {
        fill: "rgba(255, 0, 0, 0.2)",
        stroke: "red",
        strokeWidth: 2,
        size: 1,
    };
}

export function createCircleMarker(coordinates: Array<number>, options: Options = Options.default) {
    // Ajouter un cercle à la couche vectorielle
    const circleFeature = new Feature(
        new Circle(coordinates, options.size), // Centre à [0, 0] et rayon de 1000000 mètres
    );

    // Style du cercle
    const circleStyle = new Style({
        fill: new Fill({
            color: options.fill, // Remplissage rouge transparent
        }),
        stroke: new Stroke({
            color: options.stroke, // Bordure rouge
            width: options.strokeWidth,
        }),
    });
    circleFeature.setStyle(circleStyle);
    return circleFeature;
}

export function createPointMarker<T>(coordinates: Array<number>, options: Options = Options.default) {
    // Ajouter un cercle à la couche vectorielle
    const feature = new Feature(
        new Point(coordinates),
    );

    // Style du cercle
    const style = new Style({
        fill: new Fill({
            color: options.fill, // Remplissage rouge transparent
        }),
        stroke: new Stroke({
            color: options.stroke, // Bordure rouge
            width: options.strokeWidth,
        }),
    });
    feature.setStyle(style);
   return feature;
}
