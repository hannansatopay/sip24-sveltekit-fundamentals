import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        // Extract form data from the request
        const data = await request.formData();
        
        // Access form data correctly
        let username = data.get('username');
        let content = data.get('content');
        let imageFile = data.get('image');

        // Convert image file to a base64 string
        let image = Buffer.from(await imageFile.arrayBuffer()).toString('base64');

        // Create a new post in the database
        await prisma.post.create({
            data: {
                username,
                content,
                image
            }
        });

        // Redirect to the home page after successful post creation
        throw redirect(302, "/");
    }
};
