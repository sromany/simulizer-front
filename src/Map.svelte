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

  import { createCircleMarker } from "./utils";
  import { getAirports } from "./services/mock";
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

    const options = {
      fill: "rgba(255, 0, 0, 0.2)",
      stroke: "red",
      strokeWidth: 2,
      size: 1,
    };

    let markers = getAirports().map((airport) => {
      console.log(
        map.getPixelFromCoordinate([airport.latitude, airport.longitude]),
      );
      return createCircleMarker([airport.latitude, airport.longitude], options);
    });
    vectorSource.addFeatures(markers);
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100vw;
    height: 100vh;
  }
</style>
