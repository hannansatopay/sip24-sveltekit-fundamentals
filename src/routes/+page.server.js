import Prisma from "../lib/prisma";

export const load = (async () => {
    const Result = await Prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return { posts: Result };
});