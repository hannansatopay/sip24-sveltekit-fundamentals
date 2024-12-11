import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const username = data.username;
    const content = data.content;
    const image = Buffer.from(await formData.get("image").arrayBuffer()).toString("base64");

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
