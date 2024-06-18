<script>
    import { default as Icon } from "@iconify/svelte";
    export let username;
    export let imageUrl;
    export let content;
  </script>
  
  <div
    class="border-2 border-slate-500 flex flex-col items-center gap-4 h-1/8 w-1/2 rounded-md p-4 shadow-lg shadow-cyan-500/50"
  >
    <div class="flex items-center gap-2">
      <img
        src="https://picsum.photos/600"
        alt=""
        class="h-8 w-8 rounded-full border-2 border-white-700"
      />
      <h1>{username}</h1>
    </div>
    <img src="data:image;base64,{imageUrl}" alt="POST" class="h-96 w-80" />
    <div class="flex items-center gap-3 w-full mb-4">
      <Icon icon="bx:heart" class="cursor-pointer" color="red-icon" />
      <p class="text-sm font-normal">{content}</p>
    </div>
  </div>