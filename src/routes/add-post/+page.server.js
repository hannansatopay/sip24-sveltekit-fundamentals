// src/routes/add-post.js

import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
default: async ({ request }) => {
const data = Object.fromEntries(await request.formData());
let username = data.Username;
let content = data.Content;
let image = Buffer.from(await data.image.arrayBuffer()).toString('base64');
let filter=data.filter;
console.log("Form Data:", { username, content, filter});

    await prisma.post.create({
        data: {
            username,
            content,
            image,
            filter
        }
    });

    throw redirect(302, "/");
}
}