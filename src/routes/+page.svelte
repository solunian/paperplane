<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Model from "$lib/components/Model.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<div class="flex h-full w-full flex-col">
  <div class="flex flex-grow flex-row">
    <Sidebar />
    <Model />
  </div>
  <Footer />
</div>
