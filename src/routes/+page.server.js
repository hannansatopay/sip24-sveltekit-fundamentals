import prisma from "$lib/prisma";

export const load = (async() => {
const result = await prisma.post.findmany();

    return {posts: result};
})