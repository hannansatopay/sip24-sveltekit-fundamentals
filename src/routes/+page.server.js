import prisma from '$lib/prisma';

export const load = async () => {
    try {
        const result = await prisma.post.findMany();
        return { posts: result };
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return { posts: [] };  // Return an empty array in case of an error
    }
};
