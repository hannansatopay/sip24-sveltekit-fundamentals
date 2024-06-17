<script>
  import Icon from "@iconify/svelte";
  const handleCreatePost = () => {
    console.log("clicked");
  };
</script>

<div
  class="w-52 flex flex-col gap-8 border-r border-slate-500 px-4 py-8 h-full fixed top-0"
>
  <h1 class="text-xl font-bold italic tracking-wide playwrite-ro">Instagram</h1>
  <ul class="cursor-pointer">
    <li class="flex items-center gap-2 h-12 p-2">
      <Icon icon="bx:home" />
      <a href="/">Home</a>
    </li>
    <li class="flex items-center gap-2 h-12 p-2" onclick={handleCreatePost}>
      <Icon icon="bx:plus" />
      <a href="/create-post">Create</a>
    </li>
  </ul>
</div>
