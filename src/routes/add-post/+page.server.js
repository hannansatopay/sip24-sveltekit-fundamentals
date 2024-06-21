import { redirect, fail } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const content = data.get('content');
        const image = data.get('image');

        // Check if the image is present and is a file
        if (!image || !(image instanceof File || image instanceof Blob)) {
            return fail(400, { message: 'Image file is missing or invalid' });
        }

        // Convert image to base64
        const arrayBuffer = await image.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        try {
            await prisma.post.create({
                data: {
                    username,
                    content,
                    image: base64Image
                }
            });

            throw redirect(302, "/");
        } catch (error) {
            console.error('Error creating post:', error);
            return fail(500, { message: 'Internal Server Error' });
        }
    }
};
