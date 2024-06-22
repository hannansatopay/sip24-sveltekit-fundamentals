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
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        showModal = false;
        selectedPost = null;
        document.body.style.overflow = '';
    }
</script>

<style>
    .modal-image {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    }
    .close-button {
        position: absolute;
        top: 8px;
        right: 16px;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000; 
    }
    body {
        background-color: #0C0908; 
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
    <header class="bg-black py-4 fixed top-0 w-full z-10 font-['Comic_Sans_MS']" style="box-shadow:  0 4px 8px rgba(211, 211, 211, 0.7);">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-4xl text-white font-bold font-['Chiller']">ANIMINSTA</h1>
            <a href="/add-post" class="bg-violet-700 hover:bg-violet-800 text-white py-2 px-4 rounded border border-gray-300">Add post</a>
        </div>
    </header>

    <div class="font-['Comic_Sans_MS']">
        <div class="my-20 grid grid-cols-1 md:grid-cols-3 gap-4"> 
            {#each data.posts as post}
            <div class="post-card mx-auto my-5">
                <div class="mx-3 flex justify-center items-center z-50 font-['Comic_Sans_MS']">
                    <div class="bg-gray-900 border border-gray-800 p-2 rounded-lg shadow-lg relative">
                        <div on:click={() => openModal(post)} class="cursor-pointer">
                            <img class="w-full border border-black" src={`data:image;base64,${post.image}`} alt="post" style="filter: {filters[post.filter]};">
                            <div class="text-sm py-2">
                                <span class="text-3xl text-blue-300 font-bold font-['chiller']">{post.username}</span>
                                <span class="text-white">{post.content}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>

    {#if showModal}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
        <div class="bg-gray-900 p-2 rounded-lg shadow-lg relative">
            <button class="font-bold close-button" on:click={closeModal} style="color: #00bcd4;">X</button>
            <img class="modal-image mt-0 mb-0" src={`data:image;base64,${selectedPost.image}`} alt="post" style="filter: {filters[selectedPost.filter]};">
        </div>
    </div>
    {/if}
</body>
