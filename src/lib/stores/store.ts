import { writable } from "svelte/store";

export const model_mouse_x = writable(0);
export const model_mouse_y = writable(0);

export const active = writable("");
