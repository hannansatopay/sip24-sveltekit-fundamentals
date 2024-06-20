<script>
    import ImageEditor from './ImageEditor.svelte';
    import { goto } from '$app/navigation';

    let files = null;
    let username = '';
    let content = '';
    let imageEditorRef = null;

    async function handleSubmit(event) {
        event.preventDefault();

        if (!files || files.length === 0) {
            alert("Please select an image to upload.");
            return;
        }

        if (imageEditorRef) {
            const filteredImage = await imageEditorRef.getFilteredImage();
            const formData = new FormData();
            formData.append('image', filteredImage);
            formData.append('username', username);
            formData.append('content', content);

            try {
                const response = await fetch('/add-post', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    files = null;
                    username = '';
                    content = '';
                    goto('/');
                } else {
                    const error = await response.json();
                    console.error('Failed to upload the image:', error.message);
                }
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input bind:value={username} name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea bind:value={content} name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
    </div>

    <ImageEditor bind:files={files} bind:this={imageEditorRef} />

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
