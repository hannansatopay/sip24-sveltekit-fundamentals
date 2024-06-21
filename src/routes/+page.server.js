import prisma from '$lib/prisma';

export const load = (async()=>{
    const result = await prisma.Post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    

    return {posts: result};

})


