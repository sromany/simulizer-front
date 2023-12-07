<script lang="ts">
    import { onMount } from "svelte";

    export let name = "Welcome to OpenLayers";
    export let coords = { x: 0, y: 0, hdms: "" };
    export let popupElement: HTMLElement;

    onMount(async () => {
        popupElement.setAttribute("hidden", "true");
    });
</script>

<div
    bind:this={popupElement}
    class="popover show"
    role="tooltip"
    data-popper-placement="left"
>
    <div class="popover-arrow"></div>
    <h3 class="popover-header">{name}</h3>
    <div class="popover-body">
        <p>The location you clicked was:</p>
        {#if coords.hdms}
            <code>{coords.hdms}</code>
        {:else}
            <code>Lat: {coords.y} / Lon: {coords.x}</code>
        {/if}
    </div>
</div>

<style>
    .popover-arrow {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #ffffff;
        inset: 100% 47.8% auto auto;
        z-index: 1;
        border: gray solid 1px;
        border-top: none;
        clip-path: polygon(0 0, 100% 0%, 50% 50%);
    }
    .popover-header {
        border: solid 1px rgba(0, 0, 0, 0.175);
        background-color: #f0f0f0;
        margin: 0px;
        border-radius: 10px 10px 0px 0px;
    }
    .popover-body p {
        margin: 0;
    }
    .popover-body {
        border: solid 1px rgba(0, 0, 0, 0.175);
        background-color: #ffffff;
        border-radius: 0px 0px 10px 10px;
        z-index: 0;
    }
    .popover {
        transform: translate(-50%, -110%);
        color: #212529;
        width: 300px;
        height: fit-content;
        position: absolute;
    }
</style>
