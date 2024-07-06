<script>
    let files= null;
    let preImg = '';
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                preImg = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<header class="bg-white py-5 shadow-xl sticky top -0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-center text-2xl font-bold font-['courier']">Flexigram</h1>
        <a href= "/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<div class="container mx-auto my-8 px-4">
    <form class="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class=" mb-3 flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if preImg}
                    <img src={preImg} alt="Preview" class="w-full max-h-64 object-cover rounded-lg mb-4" />
                    <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                {:else}
                <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M7 8l3-3m0 0l3 3m-3-3v12"/>
                    </svg>
                    <p class="text-sm text-gray-500 text-center font-semibold">Click to upload</p>
                {/if}
            </div>
            <input bind:files on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png/jpeg" class="hidden" required/>
        </label>
        <div class ="mb-3">
            <label for ="username" class="block mb-2 text-sm fornt-medium text-gray-900">Username</label>
            <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
        </div>
        <div class= "mb-3">
            <label for ="content" class="block mb-2 text-sm fornt-medium text-gray-900">Content</label>
            <textarea name="content" id="content"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>
        <button type="submit" class="text-black bg-pink-700 hover:bg-pink-800 font medium rounded-lg text-sm px-5 py-2.5">Post</button>
    </form>
</div>
