<script>
    import "../app.css";
    import Sidebar from "../lib/Sidebar.svelte";
  </script>
  
  <div class="flex h-screen basis-2">
    <Sidebar />
    <slot />
  </div>