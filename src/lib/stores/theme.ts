import { writable } from "svelte/store";


// use hex!
// laid out from dark to light -> defaults
export const footer_color = writable(""); // ->
export const sidesidebar_color = writable(""); // ->
export const sidebar_color = writable(""); // ->
export const editorbg_color = writable(""); // ->
export const text_color = writable(""); // ->

export function hex_to_rgb() {
  
}