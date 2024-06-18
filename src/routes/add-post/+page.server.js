import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import ImageEditor from '$lib/ImageEditor.svelte'; 

export const actions = {
    default: async ({ request }) => {
        try {
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
        } catch (error) {
            console.error('Error creating post:', error);
            return { status: 500, body: { error: 'There was an error creating the post.' } };
        }
    }
};

