import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";
import { Point } from "ol/geom";
import { View } from "ol";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { getAirports } from "./services/airports";

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

  // function selectStyle(feature: any) {
  //   const color = feature.get("COLOR") || "rgb(255, 80, 80)";
  //   selected.getFill().setColor(color);
  //   return selected;
  // }
  // select interaction working on "pointermove"
  const selectClick = new Select({
    condition: click,
    // style: selectStyle,

  });

  map.addInteraction(selectClick);
    selectClick.on("select", function (e) {
  });
}

export async function setup() {
  const vectorSource = new VectorSource();
  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: vectorSource,
      }),
    ],
    target: "map",
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
  let has_next_page = true;
  let id = 0;
  do {
    const airports = await getAirports(++id);
    const airports_markers = airports.data.map((airport) => {
      return createPointMarker([airport.longitude, airport.latitude]);
    });
    vectorSource.addFeatures(airports_markers);
    has_next_page = airports.meta.hasNextPage;
  } while (has_next_page);
  testSelect(map);
}