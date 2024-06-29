import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData); // Use Object.fromEntries

    const username = data.username;
    const content = data.content;

    // Handle potential missing image data
    const image = data.image?.arrayBuffer() ? Buffer.from(data.image.arrayBuffer()).toString('base64') : null;

    await prisma.post.create({
      data: {
        username,
        content,
        image,
      },
    });

    throw redirect(302, "/");
  },
};
