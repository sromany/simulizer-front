<!-- Map.svelte -->
<script>
  import { onMount } from "svelte";

  import "ol/ol.css";
  import { createPointMarker, setup } from "../utils";
  import { useGeographic } from "ol/proj";
  import Popover from "./Popover.svelte";
  import VectorSource from "ol/source/Vector";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
  import VectorLayer from "ol/layer/Vector";
  import { Map, Overlay, View } from "ol";
  import { getAirports } from "../services/airports";
  import Select from "ol/interaction/Select";
  import { click } from "ol/events/condition";
  import { toStringHDMS } from "ol/coordinate";

  let node;
  let data = {
    coords: { x: 0, y: 0, hdms: "" },
    name: "",
  };

  useGeographic();
  onMount(async () => {
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
        return createPointMarker(airport.name, [
          airport.longitude,
          airport.latitude,
        ]);
      });
      vectorSource.addFeatures(airports_markers);
      has_next_page = airports.meta.hasNextPage;
    } while (has_next_page && false);

    // Popup overlay
    let popup = new Overlay({
      element: node,
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
        data = {
          coords: {
            x: coordinate[1],
            y: coordinate[0],
            hdms: toStringHDMS(coordinate),
          },
          name: evt.selected[0].get("name"),
        };
        popup.setPosition(coordinate);
      }
    });
    map.addInteraction(selectClick);
    // ---------------------------------------------
    node.removeAttribute("hidden");
  });
</script>

<div tabindex="1" id="map"></div>
<Popover {...data} bind:popup={node} />

<style>
  #map {
    width: 100vw;
    height: 100vh;
    color: rgb(255, 80, 80);
  }
</style>
