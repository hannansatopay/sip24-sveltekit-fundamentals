import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const username = data.username;
        const content = data.content;
        const imageFile = formData.get('image');

        // Check if image exists in form data
        if (!imageFile) {
            throw new Error("Image is missing in form data");
        }

        let image;
        try {
            // Convert image to base64 string
            const arrayBuffer = await imageFile.arrayBuffer();
            image = Buffer.from(arrayBuffer).toString("base64");
        } catch (error) {
            console.error("Error processing image:", error);
            throw error;
        }

        await prisma.post.create({
            data: {
                username,
                content,
                image
            }
        });

        throw redirect(302, "/");

    }
};