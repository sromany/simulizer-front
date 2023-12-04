<!-- Map.svelte -->
<script>
  import { onMount } from "svelte";

  import "ol/ol.css";
  import { setup } from "../utils";
  import { useGeographic } from "ol/proj";
  import Popover from "./Popover.svelte";

  let selected = null;
  useGeographic();
  onMount(async () => {
    setup();
  });

  let m = { x: 0, y: 0 };

</script>

<div id="map"></div>
<Popover coords={[m.y, m.x]} />

<style>
  #map {
    width: 100vw;
    height: 100vh;
    color: rgb(255, 80, 80);
  }
</style>
