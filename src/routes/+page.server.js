import prisma from '$lib/prisma';
export const load = (async() => {
    const posts = await prisma.post.findMany();
    return { posts :result };
    
})
