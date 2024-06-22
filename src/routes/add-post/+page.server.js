import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        let username = formData.get('username');
        let content = formData.get('content');
        let image = formData.get('image');

        await prisma.post.create({
            data: {
                username,
                content,
                image: image.split(",")[1] // Remove the data URL scheme before storing
            }
        });

        throw redirect(302, "/");
    }
};
