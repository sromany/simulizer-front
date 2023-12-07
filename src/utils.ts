import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";
import { Point } from "ol/geom";
import { Overlay, View } from "ol";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { getAirports } from "./services/airports";
import { toStringHDMS } from "ol/coordinate";
import type { Writable } from "svelte/store";

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

export function createPointMarker(name: string, coordinates: Array<number>, options: Options = Options.default) {
  // Ajouter un cercle à la couche vectorielle
  const feature = new Feature({
    geometry: new Point(coordinates),
    name: name
  }
  );
  return feature;
}

function setupSelectFeatures(map: Map) {
  // select interaction
  const selectClick = new Select({
    condition: click,
  });
  selectClick.on("select", function (evt) {
    console.log(evt)
  });
  map.addInteraction(selectClick);
}


export async function setup(popupElement: HTMLElement, setPopupData: Function) {
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
    const airports_markers = airports.data.map((airport:any) => {
      return createPointMarker(airport.name, [
        airport.longitude,
        airport.latitude,
      ]);
    });
    vectorSource.addFeatures(airports_markers);
    has_next_page = airports.meta.hasNextPage;
  } while (has_next_page);

  // Popup overlay
  let popup = new Overlay({
    element: popupElement,
  });
  map.addOverlay(popup);
  // ---------------------------------------------

  // select interaction
  const selectClick = new Select({
    condition: click,
  });

  selectClick.on("select", function (evt) {
    if (evt.selected.length > 0) {
      console.log(evt.selected[0].get("name"));
      const coordinate = evt.selected[0].getGeometry()?.getCoordinates();
      setPopupData(evt.selected[0].get("name"), coordinate);
      popup.setPosition(coordinate);
    }
  });
  map.addInteraction(selectClick);
  // ---------------------------------------------
  popupElement.removeAttribute("hidden");
}
