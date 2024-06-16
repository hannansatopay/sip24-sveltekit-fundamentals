import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    let { username, content, image } = data;
    let imageData = null;
    if (image instanceof File) {
      const buffer = await image.arrayBuffer();
      imageData = Buffer.from(buffer).toString("base64");
    }

    await prisma.post.create({
      data: {
        username,
        content,
        image: imageData,
      },
    });
    throw redirect(302, "/");
  },
};
