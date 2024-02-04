<!-- 
  grabber code nicely stolen from https://svelte.dev/repl/8b974ea483c648fba362a1e9f3dbc29f?version=4.2.9
 -->

<script lang="ts">
  let explorer: HTMLDivElement;
  let is_explorer_open = true;
  const handle_docbutton = () => {
    explorer.style.display = is_explorer_open ? "none" : "flex";
    is_explorer_open = !is_explorer_open;
  };

  function move(element: HTMLDivElement) {
    return {
      destroy() {},
    };
  }

  function resize(element: HTMLDivElement) {
    const right = document.createElement("div");
    right.classList.add("grabber");
    right.classList.add("right");

    const grabbers = [right];

    let active: DOMRect | null = null;
    let initialRect: any = null,
      initialPos: any = null;

    grabbers.forEach((grabber) => {
      element.appendChild(grabber);
      grabber.addEventListener("mousedown", onMousedown);
    });

    function onMousedown(event: MouseEvent) {
      active = <DOMRect>(<unknown>event.target);
      const rect = element.getBoundingClientRect();
      const parent = element.parentElement!.getBoundingClientRect();

      // console.log({rect, parent})

      initialRect = {
        width: rect.width,
        right: parent.right - rect.right,
      };
      initialPos = { x: event.pageX, y: event.pageY };
    }

    function onMouseup(event: MouseEvent) {
      if (!active) return;

      active = null;
      initialRect = null;
      initialPos = null;
    }

    function onMove(event: MouseEvent) {
      if (!active) return;

      let delta = event.pageX - initialPos.x;
      element.style.width = `${initialRect.width + delta}px`;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onMouseup);

    return {
      destroy() {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mousemove", onMousedown);

        grabbers.forEach((grabber) => {
          element.removeChild(grabber);
        });
      },
    };
  }

  let sidebar_stuff: String[] = ["file1", "file2", "file3"];
</script>

<aside class="flex flex-row">
  <!-- side-sidebar -->
  <div class="flex flex-col items-center gap-1 bg-gray-500 px-2 py-2">
    <!-- doc/files -->
    <button
      on:click={handle_docbutton}
      class="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-7 w-7">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- settings -->
    <button
      class="mt-auto flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-7 w-7">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </button>
  </div>

  <div
    bind:this={explorer}
    class="relative left-0 top-0 z-0 flex h-full w-[14rem] min-w-[7rem] max-w-[80vw] select-none flex-col bg-gray-400"
    use:move
    use:resize>
    <!-- new folder, new file, refresh, sort -->
    <div class="flex flex-row items-center justify-end gap-0.5 px-1.5 py-1">
      <button class="rounded-lg p-1 transition hover:bg-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      </button>

      <button class="rounded-lg p-1 transition hover:bg-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
      </button>

      <button class="rounded-lg p-1 transition hover:bg-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-6 w-6">
          <path
            fill-rule="evenodd"
            d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="rounded-lg p-1 transition hover:bg-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      </button>
    </div>

    {#each sidebar_stuff as stuff}
      <div class="px-2 even:bg-gray-300">{stuff}</div>
    {/each}
  </div>
</aside>

<style lang="postcss">
  :global(.grabber) {
    @apply absolute box-border;
  }

  :global(.grabber.right) {
    @apply right-0 h-full w-1 cursor-col-resize transition hover:bg-gray-600;
  }
</style>
