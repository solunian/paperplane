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

<aside>
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
