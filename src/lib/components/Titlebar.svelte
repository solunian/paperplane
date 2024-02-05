<script lang="ts">
  import { onMount } from "svelte";
  import { Window } from "@tauri-apps/api/window";

  let bar: HTMLDivElement;

  onMount(() => {
    bar.addEventListener("dblclick", async (event: MouseEvent) => {
      const window = Window.getCurrent();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }
    });
  });
</script>

<div bind:this={bar} data-tauri-drag-region class="h-7 bg-gray-500" />
