<script>
    let url = '';
    let links = [];
    let error = '';

    async function fetchLinks() {
        try {
            const response = await fetch(`http://localhost:3000/fetch-links?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            links = await response.json();
            error = "";
        } catch (err) {
            error = `Error: ${err.message}`;
        }
    }
</script>

<main>
    <h1>Fetch Links from URL</h1>
    <input type="text" bind:value={url} placeholder="Enter website URL" />
    <button on:click={fetchLinks}>Fetch Links</button>

    {#if error}
        <p style="color: red">{error}</p>
    {/if}

    {#if links.length > 0}
        <ul>
            {#each links as link}
                <li><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
            {/each}
        </ul>
    {/if}
</main>
