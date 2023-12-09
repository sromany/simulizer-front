<!-- Map.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  import "ol/ol.css";
  import { setup } from "../utils/utils";
  import { useGeographic } from "ol/proj";
  import Popover from "./Popover.svelte";
  import { toStringHDMS } from "ol/coordinate";
  import { popupdata } from "../store";

  let popupElement: HTMLElement;

  useGeographic();

  onMount(async () => {
    setup(popupElement, setPopupData);
  });

  function setPopupData(name: string, coordinate: any) {
    $popupdata = {
      coords: {
        x: coordinate[1],
        y: coordinate[0],
        hdms: toStringHDMS(coordinate),
      },
      name: name,
    };
  }
</script>

<div tabindex="-1" id="map"></div>
<Popover {...$popupdata} bind:popupElement />

<style>
  #map {
    width: 100vw;
    height: 100vh;
    color: rgba(255, 80, 80, 1.0);
  }
</style>
