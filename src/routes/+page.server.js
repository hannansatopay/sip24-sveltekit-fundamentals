
import prisma from "$lib/prisma";
export const load = (async () => {

    const result = await prisma.post.findMany({
        //new posts first
        orderBy: {
            createdAt: 'desc'
        },
    })

    return {
        posts: result
    }
})