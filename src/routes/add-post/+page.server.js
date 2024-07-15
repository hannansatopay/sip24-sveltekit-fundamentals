import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import { onMount } from "svelte";

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const username = data.username;
        const content = data.content;

        // Ensure that `data.image` is not undefined /
        let image = null;
        if (data.image && data.image instanceof File) {
            image = Buffer.from(await data.image.arrayBuffer()).toString('base64');
        }

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