<!-- <h1>Welcome to Summer Internship 2024</h1> -->
<script>
    export let data;

    let showModal = false;
    let currentImageUrl = "";
    let captionText = "";
    let imgInd = 0;

    function modalImg(pageInd){
        // Get the modal
        let modal = document.getElementById("myModal");

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        let img = document.getElementById(pageInd);
        imgInd = pageInd;
        let modalImg = document.querySelector(".modal-content");
        let captionText = document.getElementById("caption");
        img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }
    }

    function grayScaleFunc() {
        let img = document.getElementById(imgInd);
        img.classList.toggle('gray-scale');
        let modalImg = document.querySelector(".modal-content img");
        modalImg.classList.add('.gray-scale');
        modalImg.style.filter = 'grayscale(100%)';
        
    }
</script>
<header class="bg-white py-4 shadow-md sticky top-2 z-10">
    <div class="container mx-auto px-4 flex justify-between">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Post Template -->
        {#each data.posts as post}            
            <div>
                <img class="w-full" id='{post.id}' src="data: image;base64,{post.image}" alt="{post.content}" on:click={()=>modalImg(post.id)}>
                <div class="py-2">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
    <div id="myModal" class="modal">

        <!-- The Close Button -->
        <span class="close">&times;</span>
      
        <!-- Modal Content (The Image) -->
        <img class="modal-content">
      
        <!-- Modal Caption (Image Text) -->
        <div id="caption"></div>
        <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gray-scale-btn" on:click={()=>grayScaleFunc(imgInd)}>Grayscale</button> -->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gray-scale-btn" on:click={grayScaleFunc}>Grayscale</button>

      </div>
</div>

<style>
    .gray-scale{
        filter: grayscale(100%);
    }
    .gray-scale-btn{
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        padding: 10px 0;
    }

    .modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation - Zoom in the Modal */
.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* The Close Button */
.close {
  position: absolute;
  top: 162px;
  right: 115px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  z-index: 20;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>