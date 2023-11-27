<script>
  import Map from "ol/Map";
  import View from "ol/View";
  import TileLayer from "ol/layer/Tile";
  import XYZ from "ol/source/XYZ";
  import { onMount } from "svelte";

  onMount(() => {
    new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100vw;
    height: 100vh;
  }
</style>
