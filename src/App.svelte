<script lang="ts">
  import Map from "./lib/Map.svelte";
  import Popover from "./lib/Popover.svelte";

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
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
