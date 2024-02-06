<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import Model from "$lib/components/Model.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Titlebar from "$lib/components/Titlebar.svelte";
</script>

<Menu />

<div class="flex h-full w-full flex-col">
  <Titlebar />
  <div class="flex flex-grow flex-row">
    <Sidebar />
    <Model />
  </div>
  <Footer />
</div>
