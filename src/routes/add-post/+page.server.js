import { Prisma } from "$lib/Prisma";
export const load = (async() => {
    const result = await Prisma.post.findMany();

    return { posts: result };

})