<!-- Map.svelte -->
<script>
  import { onMount } from "svelte";

  import "ol/ol.css";

  import { setup } from "./utils";
  import { useGeographic } from "ol/proj";
  import Popover from "./lib/Popover.svelte";

  useGeographic();
  onMount(async () => {
    setup();
  });
  
</script>

<div id="map"></div>
<Popover />

<style>
  #map {
    width: 100vw;
    height: 100vh;
    color: rgb(255, 80, 80);
  }
</style>
