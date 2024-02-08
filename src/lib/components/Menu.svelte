<script lang="ts">
  import { is_menu_open } from "$lib/stores/menu";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  const close_menu = () => ($is_menu_open = false);
  onMount(() => {
    window.addEventListener("keydown", (event) => {
      if ($is_menu_open === true && event.code === "Escape") {
        close_menu();
      }
    });
    window.addEventListener("mousedown", (event) => {
      if (event.x) {

      }
    });

    window.removeEventListener("keydown", () => {});
  });
</script>

{#if $is_menu_open}
  <!-- clicking outside... any click outside of menu will close menu -->
  <!-- <button class="absolute h-screen w-screen z-30 cursor-default bg-transparent" on:click={close_menu}/> -->
  <div
    transition:fly={{ duration: 250, y: 15 }}
    class="absolute bottom-0 left-0 right-0 top-0 z-30 m-auto h-72 w-[40rem] rounded-lg border border-gray-300 bg-white px-3 py-3 shadow-2xl">
    <input
      type="text"
      placeholder="Menu"
      class="h-15 w-full rounded-lg bg-blue-200 px-3 py-2 text-xl outline-none" />
  </div>
{/if}
