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

  import { createCircleMarker, createPointMarker, testSelect } from "./utils";
  import { useGeographic } from "ol/proj";
  import { getAirports } from "./services/airports";

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

    let airports = await getAirports();
    let airports_markers = airports.data.map((airport) => {
      const a = createCircleMarker([airport.longitude, airport.latitude]);
      console.info(
        `${a.values_.geometry.flatCoordinates} === ${[
          airport.longitude,
          airport.latitude,
        ]}`,
      );
      return a;
    });
    vectorSource.addFeatures(airports_markers);
    testSelect(map);
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100vw;
    height: 100vh;
    color: rgb(255, 80, 80);
  }
</style>
