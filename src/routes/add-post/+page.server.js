// src/routes/submit/+page.server.js
import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const { username, content } = data;
        const imageBuffer = Buffer.from(await data.image.arrayBuffer());
        const image = imageBuffer.toString('base64');
        
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
