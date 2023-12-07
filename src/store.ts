import { writable } from "svelte/store";

export const popupdata = writable({
    coords: { x: 0, y: 0, hdms: "" },
    name: "",
});