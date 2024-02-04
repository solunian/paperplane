<script lang="ts">
  import { onMount } from "svelte";
  import { appWindow } from "@tauri-apps/api/window";

  let bar: HTMLDivElement;

  onMount(() => {
    bar.addEventListener("dblclick", async (event: MouseEvent) => {
      await appWindow.toggleMaximize();
    });
  });
</script>

<div bind:this={bar} data-tauri-drag-region class="h-7 bg-gray-500" />
