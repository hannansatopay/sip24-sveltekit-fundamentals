<script>
    let files =null;
    let previewImageBase64 = '';
    function fileUpload(event){
        if(event.target.files && event.target.files[0]){
            const max_size = 10000000000000;
            const allowed_types = ['image/jpg','image/jpeg']
            const max_height = 15200;
            const max_width = 25600;

            const reader = new FileReader();
            reader.onload = (e) =>{
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    const imgBase64Path = e.target.result;

                    previewImageBase64 = imgBase64Path;
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
            <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-5">
            {#if files && files.length}
                <img src="{previewImageBase64}" class="grayscale" alt="preview" height="150px" width="150px">
                <p class="text-sm text-gray-500 font-semibold ">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold "> Click to upload</p>
            {/if}
        </div>
        <input bind:files id="dropzone" name="image" type="file" accept="image/png, image/jpeg " on:change={fileUpload} class="hidden" required>

    </label>
    <div class="mb-3">
        <label for="userName" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input type="text" name="username" id="usename" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>

</form>
<style>
    .grayscale{
        filter:grayscale(100%);
    }
</style>