import prisma from '$lib/prisma';

export const load = async () => {
    const result = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return { posts: result };
};

export const actions = {
    submitPost: async ({ request }) => {
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
        });

        throw redirect(302, "/");
    },

    likePost: async ({ request }) => {
        const data = await request.json();
        const { postId } = data;

        await prisma.post.update({
            where: { id: postId },
            data: { likes: { increment: 1 } }
        });

        return { status: 200 };
    },

    deletePost: async ({ request }) => {
        const data = await request.json();
        const { postId } = data;

        await prisma.post.delete({
            where: { id: postId }
        });

        return { status: 200 };
    }

};
