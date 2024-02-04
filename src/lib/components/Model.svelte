<script lang="ts">
  import { onMount } from "svelte";
  import { is_explorer_open } from "$lib/stores/store";

  let bounding_box: HTMLDivElement;

  onMount(() => {
    let unsubscribe = is_explorer_open.subscribe((is_open) => {
      bounding_box.style.paddingLeft = is_open ? "4px" : "0px";
    });
    return unsubscribe;
  });
</script>

<div bind:this={bounding_box} class="relative flex h-full w-full flex-row bg-gray-500 px-1">
  <textarea
    autocomplete="off"
    spellcheck="false"
    class="h-full w-full resize-none rounded-t-lg bg-slate-300 px-2 py-2 outline-none" />
</div>
