<header class="bg-white py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between itens-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">SwiftKart</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700     rounded text-white p-2 font-bold">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <div class="py-3">
        <label for="username" class="text-sm font-medium text-gray-900 block mb-2">Username</label>
        <input name="username" id="username" class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
    </div>
    <label for="upload" class="text-sm font-medium text-gray-900 block mb-2" >Upload the image</label>
    <input class="py-2 text-sm" name="image" type="file" id="dropzone" accept="image/png, image/jpeg" clas="hidden" required/>
    <div class="py-3">
        <label for="content" class="text-sm font-medium text-gray-900 block mb-2">Caption</label>
        <textarea name="content" id="content" class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 rounded text-white p-2 font-bold">Share</button>
</form>