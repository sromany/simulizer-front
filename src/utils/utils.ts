import { Overlay, View } from "ol";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { getAirportConnections, getAirports } from "../services/airports";
import { AirportMarker } from "./airport_marker";
import { Connection } from "./connection";


class Options {
    fill: any; stroke: any; strokeWidth: any; size: any;
    static default = {
        fill: "rgba(255, 0, 0, 0.2)",
        stroke: "red",
        strokeWidth: 2,
        size: 1,
    };
};


export class MapManager {
    popupElement!: HTMLElement;
    map!: Map;
    elements: any;
    async setup(setPopupData: Function) {
        const vectorSource = new VectorSource();
        this.map = new Map({
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
        setupPopupOverlay(this.map, this.popupElement, setPopupData);
        setupAirportFeatures(vectorSource);
        setupAirportConnections(vectorSource);
        this.setupTravelersFeatures();
    }

    setupTravelersFeatures() {
        const info = document.getElementById('info');
        let currentFeature: undefined;
        const displayFeatureInfo = (pixel, target) => {
            const feature = target.closest('.ol-control')
                ? undefined
                : this.map.forEachFeatureAtPixel(pixel, function (feature) {
                    return feature;
                });
            if (info) {
                if (feature) {

                    info!.style.left = pixel[0] + 'px';
                    info!.style.top = pixel[1] + 'px';
                    if (feature !== currentFeature) {
                        info!.style.visibility = 'visible';
                        info!.innerText = feature.get('ECO_NAME');
                    }
                } else {
                    info!.style.visibility = 'hidden';
                }
            }
            currentFeature = feature;
        };

        this.map.on('pointermove', (evt) => {
            if (evt.dragging) {
                info!.style.visibility = 'hidden';
                currentFeature = undefined;
                return;
            }
            const pixel = this.map.getEventPixel(evt.originalEvent);
            displayFeatureInfo(pixel, evt.originalEvent.target);
        });

        this.map.on('click', function (evt) {
            displayFeatureInfo(evt.pixel, evt.originalEvent.target);
        });

        this.map.getTargetElement().addEventListener('pointerleave', function () {
            currentFeature = undefined;
            info!.style.visibility = 'hidden';
        });
    }
}

async function setupAirportFeatures(source: VectorSource) {
    let has_next_page = true;
    let id = 0;
    do {
        const airports = await getAirports(++id);
        const airports_points = airports.data.map((airport: any) => {
            return new AirportMarker(airport);
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
            return new Connection(connection);
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
            const feature = evt.selected[0];
            if ('airport' in feature) {
                const coordinate = feature.getGeometry()?.getCoordinates();
                setPopupData((feature as AirportMarker).airport.name, coordinate);
                popup.setPosition(coordinate);
                popupElement.hidden = false;
            }
            if ('connection' in feature) {
                console.log("Hop!");
            }
        } else {
            popupElement.hidden = true;
        }
    });
    map.addInteraction(selectClick);
}