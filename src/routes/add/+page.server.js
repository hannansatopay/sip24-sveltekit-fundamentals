import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    let username = data.username;
    let content = data.content;
    const imageFile = data.image;
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    // let image = Buffer.from(data.image).toString("base64");
    await prisma.post.create({
      data: {
        username: username,
        content: content,
        image: imageBase64,
      },
    });
    throw redirect(302, "/");
    console.log(data);
  },
};
