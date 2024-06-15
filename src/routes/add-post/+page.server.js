import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const content = formData.get('content');
        const imageFile = formData.get('image');  // Get the image file from form data

        if (!imageFile) {
            return fail(400, { message: 'No image provided' });
        }

        // Convert the image to a Buffer
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

        // Convert the Buffer to a base64 string
        const base64Image = imageBuffer.toString('base64');

        try {
            await prisma.post.create({
                data: {
                    username,
                    content,
                    image: base64Image
                }
            });
        } catch (error) {
            console.error('Error creating post:', error);
            return fail(500, { message: 'Failed to create post' });
        }

        throw redirect(303, '/');
    }
};