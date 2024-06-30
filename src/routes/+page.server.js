import prisma from '$lib/prisma';

// this function automatically runs whenever page is loded at a first time
export const load = (async() => {
    const result = await prisma.post.findMany();
     return { posts: result };

})