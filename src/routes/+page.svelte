<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Model from "$lib/Model.svelte";
  import Sidebar from "$lib/Sidebar.svelte";
</script>

<div class="flex h-full w-full flex-col">
  <div class="flex flex-grow flex-row">
    <Sidebar />
    <Model />
  </div>
  <Footer />
</div>
