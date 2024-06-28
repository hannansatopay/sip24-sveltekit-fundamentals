import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);

            console.log('Form Data:', data); // Log form data for debugging

            const username = data.username;
            const content = data.content;

            const imageFile = data.image;
            const arrayBuffer = await imageFile.arrayBuffer();
            const image = Buffer.from(arrayBuffer).toString('base64');

            console.log('Processed Image Data:', image); // Log image data

            const newPost = await prisma.post.create({
                data: {
                    username,
                    content,
                    image
                }
            });

            console.log('New Post Created:', newPost); // Log the new post

            throw redirect(302, "/");
        } catch (error) {
            console.error('Error creating post:', error); // Log errors
            return {
                status: 500,
                body: { error: 'Failed to create post' }
            };
        }
    }
};
