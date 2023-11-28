import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";


class Options {
    fill: any; stroke: any; strokeWidth: any; size: any;
}

export function createCircleMarker(coordinates: Array<number>, options: Options) {
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
