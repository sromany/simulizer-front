<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import Leaf from "./Leaf.svelte";

  const WIDTH = 640;
  const HEIGHT = 580;
</script>

<main>
  <Leaf />
  <!-- <Canvas size={{ width: WIDTH, height: HEIGHT }}>
    <Scene WIDTH HEIGHT />
  </Canvas> -->
</main>

<style>
</style>
