import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";
import { LineString, Point } from "ol/geom";
import { Overlay, View } from "ol";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { getAirportConnections, getAirports } from "../services/airports";

class Options {
  fill: any; stroke: any; strokeWidth: any; size: any;
  static default = {
    fill: "rgba(255, 0, 0, 0.2)",
    stroke: "red",
    strokeWidth: 2,
    size: 1,
  };
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

  setupPopupOverlay(map, popupElement, setPopupData);
  setupAirportPoint(vectorSource);
  setupAirportConnections(vectorSource);
}


async function setupAirportPoint(source: VectorSource) {
  let has_next_page = true;
  let id = 0;
  do {
    const airports = await getAirports(++id);
    const airports_points = airports.data.map((airport: any) => {
      return createPoint(airport);
    });
    source.addFeatures(airports_points);
    has_next_page = airports.meta.hasNextPage;
  } while (has_next_page);
}

async function setupAirportConnections(source: VectorSource) {
  let has_next_page = true;
  let id = 0;
  do {
    const connections = await getAirportConnections(++id);
    const airports_connections = connections.data.map((connection: any) => {
      return createLineString(connection);
    });
    source.addFeatures(airports_connections);
    has_next_page = connections.meta.hasNextPage;
  } while (has_next_page);
}


function setupPopupOverlay(map: Map, popupElement: HTMLElement, setPopupData: Function) {
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
      if(evt.selected[0].get("airport")) {
        const coordinate = evt.selected[0].getGeometry()?.getCoordinates();
        setPopupData(evt.selected[0].get("airport").name, coordinate);
        popup.setPosition(coordinate);
        popupElement.hidden = false;
      }

    } else {
      popupElement.hidden = true;
    }
  });

  map.addInteraction(selectClick);
}

export function createPoint(airport: any, options: Options = Options.default) {
  // Ajouter un cercle à la couche vectorielle
  const coordinates = [airport.longitude, airport.latitude];
  const feature = new Feature({
    geometry: new Point(coordinates),
    airport: airport
  }
  );
  return feature;
}

function createLineString(connection: any, options: Options = Options.default) {
  const startCoordinates = [connection.airports[0].longitude, connection.airports[0].latitude];
  const endCoordinates = [connection.airports[1].longitude, connection.airports[1].latitude];
  const feature = new Feature({
    geometry: new LineString([startCoordinates, endCoordinates]),
    connection: connection
  }
  );
  return feature;
}
