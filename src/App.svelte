<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import Map from "./Map.svelte";

  const WIDTH = 640;
  const HEIGHT = 580;
</script>

<main>
  <Map />
  <!-- <Canvas size={{ width: WIDTH, height: HEIGHT }}>
    <Scene WIDTH HEIGHT />
  </Canvas> -->
</main>

<style>
</style>
