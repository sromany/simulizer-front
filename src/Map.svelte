<!-- Map.svelte -->
<script>
  import { onMount } from "svelte";

  import "ol/ol.css";
  import Map from "ol/Map";
  import View from "ol/View";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
  import VectorLayer from "ol/layer/Vector";
  import VectorSource from "ol/source/Vector";

  import { createCircleMarker, createPointMarker } from "./utils";
  import { getAirports as mock } from "./services/mocks";
  import { getAirports } from "./services/airports";
  import { useGeographic } from "ol/proj";

  useGeographic();

  onMount(async () => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    let airports = await getAirports();
    let airports_markers = airports.map((airport) => {
      return createCircleMarker([airport.latitude, airport.longitude]);
    });

    vectorSource.addFeatures(airports_markers);
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100vw;
    height: 100vh;
  }
</style>
