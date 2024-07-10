import prisma from "C:/Users/DELL/OneDrive/Documents/GitHub/sip24-sveltekit-fundamentals/src/lib/prisma.js";

export const load = (async() => {
    const result = await prisma.post.findMany();
    return{ posts: result };
})

