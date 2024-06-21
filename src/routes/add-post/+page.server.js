import { redirect } from "@sveltejs/kit";
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
        });
        
        throw redirect(302, "/");
    },

    //  delete: async ({ params }) => {
    //     const { id } = params;

    //     try {
    //         await prisma.post.delete({
    //             where: {
    //                 id: parseInt(id, 10),
    //             },
    //         });

    //         return {
    //             status: 200,
    //             body: { message: 'Post deleted successfully' },
    //         };
    //     } catch (error) {
    //         console.error('Error deleting post:', error);
    //         return {
    //             status: 500,
    //             body: { error: 'Failed to delete post' },
    //         };
    //     }
    // }
};
