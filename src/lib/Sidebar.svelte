<!-- 
  grabber code nicely stolen from https://svelte.dev/repl/8b974ea483c648fba362a1e9f3dbc29f?version=4.2.9
 -->

<script lang="ts">
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

  let sidebar_stuff: String[] = ["hello", "hello", "hello"];
</script>

<aside class="flex flex-row">
  <!-- side-sidebar -->
  <div class="flex flex-col items-center gap-1 bg-gray-500 px-2 py-2">
    <!-- doc/files -->
    <button
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
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
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
    class="relative left-0 top-0 z-0 flex h-full w-[20vw] flex-col bg-gray-400 px-2"
    use:move
    use:resize>
    {#each sidebar_stuff as stuff}
      <div>{stuff}</div>
    {/each}
  </div>
</aside>

<style lang="postcss">
  :global(.grabber) {
    @apply absolute box-border;
  }

  :global(.grabber.right) {
    @apply right-0 h-full w-1 cursor-col-resize bg-gray-800;
  }
</style>
