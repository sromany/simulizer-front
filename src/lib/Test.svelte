<!-- AnimatedLineStringSvelteTweened.svelte -->
<script>
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import "ol/ol.css";
  import Map from "ol/Map";
  import View from "ol/View";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
  import VectorLayer from "ol/layer/Vector";
  import VectorSource from "ol/source/Vector";
  import LineString from "ol/geom/LineString";
  import Feature from "ol/Feature";
  import { Style, Stroke } from "ol/style";
  import { useGeographic } from "ol/proj.js";

  useGeographic();
  let lineCoordinates = tweened([0, 0], { duration: 5000 });
  let lineFeature;

  onMount(() => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const coordinates = [
      [0, 0],
      [10, 10],
      [20, 0],
      [30, 10],
      [40, 0],
    ];

    const lineString = new LineString(coordinates);
    lineFeature = new Feature(lineString);

    const lineStyle = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 2,
      }),
    });

    lineFeature.setStyle(lineStyle);

    vectorSource.addFeature(lineFeature);

    // Ajouter l'animation avec tweened
    lineCoordinates.set(coordinates[0]);

    const animateLine = () => {
      let currentIndex = 0;

      const animate = () => {
        currentIndex += 1;

        if (currentIndex < coordinates.length) {
          lineCoordinates.set(coordinates[currentIndex]);
          requestAnimationFrame(animate);
        } else {
          console.log("Animation terminée");
        }
      };

      requestAnimationFrame(animate);
    };

    animateLine();
  });

  onDestroy(() => {
    // Nettoyer les ressources à la destruction du composant
    lineCoordinates.end();
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>
