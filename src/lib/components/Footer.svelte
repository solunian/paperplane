<script>
  import { is_menu_open } from "$lib/stores/menu";
</script>

<footer class="flex h-5 w-full flex-row items-center bg-gray-700 px-2 text-xs">
  <button
    on:click={() => {
      $is_menu_open = !$is_menu_open;
    }}
    class="h-full bg-gray-900 px-1 text-white">
    menu button
  </button>
</footer>
