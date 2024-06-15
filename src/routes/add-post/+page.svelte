<script>
    let files = null;

    function handleFileUpload(event){
        files = event.target.files;
        if(files && files.length){
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("uploadedImage").src = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        }
    }
</script>

<header class="p-4 shadow-md sticky top-0 z-10" style="background-color: #FFFAF0;">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']" >Instagram</h1>
        <a href="/" class="hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" style="background-color:#cd486b">Home</a>
    </div>
</header>

<form class="container mx-auto p-5 my-8 w-10/12 md:w-6/12 bg-green-50 rounded-lg shadow-md" method="POST" enctype="multipart/form-data" style="background-color: #FFFAF0;">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50" style="height: 360px;">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
            <img id="uploadedImage" class=" mb-4 object-cover" alt="Uploaded Image" style="height: 300px; width:500px;"/>
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileUpload}/>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <div class="flex justify-center">
        <button type="submit" class="w-60 text-white font-medium rounded-lg text-sm px-5 py-2.5" style="background-color:#cd486b ;">Share</button>
    </div>
</form>