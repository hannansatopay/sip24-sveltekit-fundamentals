<script>
    export let data;

    const filters = {
        original: '',
        grayscale: 'grayscale(100%)',
        sepia: 'sepia(100%)',
        ludwig: 'brightness(110%) contrast(90%) saturate(110%)',
        clarendon: 'contrast(120%) saturate(120%)'
    };
    let showModal = false;
    let selectedPost = null;

    function openModal(post) {
        selectedPost = post;
        showModal = true;
        // Prevent scrolling of the background content when modal is open
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        showModal = false;
        selectedPost = null;
        // Restore scrolling when modal is closed
        document.body.style.overflow = '';
    }
</script>    

<style>
    body {
        background-color: #0C0908; /* Change this to the color you want */
    }
    html, body {
        height: 100%;
        margin: 0;
    }

    body {
        display: flex;
        flex-direction: column;
    }

    .post-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .post-card:hover {
        transform: scale(1.02);
    }
</style>

<body class="h-page">
    <header class="bg-purple-500 py-4 fixed top-0 w-full z-10 font-['yourFont']" style="box-shadow:  0 4px 8px rgba(211, 211, 211, 0.7);">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-5xl text-white font-bold font-['Chiller']">Cozy Corner</h1>
            <a href="/add-post" class="bg-black hover:bg-violet-800 text-white py-2 px-4 rounded-lg border border-purple-900">Add post</a>
        </div>
    </header>

    <div class="font-['yourFont']">
        <div class="my-20 grid grid-cols-1 md:grid-cols-3 gap-4"> 
            {#each data.posts as post}
            <div class="post-card mx-auto my-5">
                <div class="mx-3 flex justify-center items-center z-50 font-['yourFont']">
                    <class class="bg-purple-500 border border-gray-800 p-2 rounded-lg shadow-lg relative">
                            <div class="text-sm py-2">
                                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                                <span class="text-3xl text-blue-200 font-bold font-['yourFont']">{post.username}</span>
                                <span class="text-white text-2xl">{post.content}</span>
                            </div>
                    </class>                  
                </div>
            </div>
            {/each}
        </div>
    </div>
    {#if showModal}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
        <div class="bg-gray-900 p-2 rounded-lg shadow-lg relative">
            <button class="font-bold close-button" on:click={closeModal} style="color: #00bcd4;">X</button>
            <img class="modal-image mt-0 mb-0" src="data:image;base64,{selectedPost.image}" alt="post" style="filter: {filters[selectedPost.filter]};">
        </div>
    </div>
    {/if}
</body>
