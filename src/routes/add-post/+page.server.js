import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
    default: async ({ request }) => {
        try {
            const data = Object.fromEntries(await request.formData());
            const username = data.username;
            const content = data.content;
            const image = Buffer.from(await data.image.arrayBuffer()).toString('base64');
            const filter = data.filter;

            console.log("Form Data:", { username, content, image, filter });

            await prisma.post.create({
                data: {
                    username,
                    content,
                    image,
                    filter
                }
            });

            throw redirect(302, "/");
        } catch (error) {
            console.error("Error creating post:", error);
            return {
                status: 500,
                body: { error: 'Internal Server Error' }
            };
        }
    }
};

export const load = async () => {
    try {
        const result = await prisma.post.findMany();
        return { posts: result };
    } catch (error) {
        console.error("Error loading posts:", error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
};
