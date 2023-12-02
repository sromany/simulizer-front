import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";
import { Point } from "ol/geom";
import type { Map } from "ol";
import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition";


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

export function createPointMarker(coordinates: Array<number>, options: Options = Options.default) {
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

export function testSelect(map: Map) {
  const selected = new Style({
    fill: new Fill({
      color: "#eeeeee",
    }),
    stroke: new Stroke({
      color: "rgba(255, 255, 255, 0.7)",
      width: 2,
    }),
  });

  function selectStyle(feature: any) {
    const color = feature.get("COLOR") || "rgb(255, 80, 80)";
    selected.getFill().setColor(color);
    return selected;
  }
  // select interaction working on "pointermove"
  const selectPointerMove = new Select({
    condition: pointerMove,
    style: selectStyle,
  });

  map.addInteraction(selectPointerMove);
  selectPointerMove.on("select", function (e) { });
}