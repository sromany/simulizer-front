<!-- Map.svelte -->
<script>
  import { onMount } from "svelte";

  import "ol/ol.css";

  import { setup } from "./utils";
  import { useGeographic } from "ol/proj";

  useGeographic();
  onMount(async () => {
    setup();
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
