<!-- Map.svelte -->
<script lang="ts">
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

  let popupElement: HTMLElement;
  let data = {
    coords: { x: 0, y: 0, hdms: "" },
    name: "",
  };

  useGeographic();
  
  import { popupdata } from "../store";
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
    color: rgb(255, 80, 80);
  }
</style>
