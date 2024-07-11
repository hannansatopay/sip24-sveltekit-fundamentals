import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    let username = data.username;
    let content = data.content;
    let image = Buffer.from(await data.image.arrayBuffer()).toString('base64');

    await prisma.post.create({
        data: {
            username,
            content,
            image
        }
    })
    }
}