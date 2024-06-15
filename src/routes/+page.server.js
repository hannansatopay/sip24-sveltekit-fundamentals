// src/routes/+page.server.js

import prisma from '$lib/prisma'; // Adjust import path based on your project setup

<<<<<<< Updated upstream
export const load = async () => {
    try {
        const posts = await prisma.post.findMany();

        return {
            props: {
                data: {
                    posts: posts || [] // Ensure posts is an array, even if empty
                }
            }
        };
    } catch (error) {
        console.error('Error fetching posts:', error);

        return {
            props: {
                data: {
                    posts: [] // Return empty array if there's an error
                }
            }
        };
    }
};
=======
export const load = (async() => {
    const result = await prisma.post.findMany();

    return { posts: result };
})
>>>>>>> Stashed changes
