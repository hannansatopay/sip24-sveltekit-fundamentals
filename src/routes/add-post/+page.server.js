// src/routes/add-post/+page.server.js

import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = Object.fromEntries(await request.formData());
            const { username, content, image } = formData;

            // Ensure image exists and convert it to base64
            if (!image) {
                throw new Error('Image file is missing.');
            }

            const imageBuffer = Buffer.from(await image.arrayBuffer());
            const imageBase64 = imageBuffer.toString('base64');

            // Create new post in the database
            await prisma.post.create({
                data: {
                    username,
                    content,
                    image: imageBase64 // Save image as base64 string
                }
            });

            // Redirect after successful creation
            return redirect(302, "/");
        } catch (error) {
            console.error('Error creating post:', error);
            return {
                error: 'There was an error creating the post.'
            };
        }
    }
};
