<script>
  import { T } from "@threlte/core";

  // Scene Configurations
  export let WIDTH;
  export let HEIGHT;
  const FOV = 45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;
</script>

<T.PerspectiveCamera
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
    ref.fov = FOV;
    ref.aspect = ASPECT;
    ref.near = NEAR;
    ref.far = FAR;
  }}
/>

<T.Mesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh>
