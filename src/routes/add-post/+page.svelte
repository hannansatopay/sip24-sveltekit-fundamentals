<header class="bg-white py-4 shadow-md sticky top-0">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Home</a
    >
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">

  <div class="fileInput mb-3 flex flex-col items-center">
    <input type="file" accept=".png, .jpg, .jpeg" />
  </div>

  <div class="mb-3">
    <label class="unameLabel">Username</label>
    <textarea type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 username-input"></textarea>
     <!-- <input type = "text" style="border-style: solid; border-color: red;"/> -->
  </div>

  <div class="mb-3">
    <label class="contentLabel">Content</label>
    <textarea type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 content-input"></textarea>
     <!-- <input type = "text" style="border-style: solid; border-color: red;"/> -->
  </div>

  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">Post</button>
</form>

<style>

  .unameLabel {
    font-weight: bold;
    padding-bottom: 30px;
  }

  .contentLabel {
    font-weight: bold;
    width: 100px;
    padding-top: 30px;
  }

  .username-input, .content-input {
    border-style: solid;  /* Solid border */
    border-color: grey;    /* Red color */
    border-width: 1px;
    border-radius: 10px;
    height: 80px;
    word-wrap: break-word;
    width: 100%;
  }

  .fileInput {
    padding-top: 20px;
    padding-bottom: 20px;
    
  }


</style>