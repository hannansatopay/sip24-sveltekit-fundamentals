import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        let username = data.username;
        let content = data.content;
        let file = formData.get("image");

        // Read the file as an array buffer
        let arrayBuffer = await file.arrayBuffer();
        let image = Buffer.from(arrayBuffer).toString('base64');

        await prisma.post.create({
            data: {
                username,
                content,
                image
            }
        });

        throw redirect(302, "/");
    }
};
