import { redirect } from "@sveltejs/kit";
import prisma from "../../lib/prisma.js";
export const actions = {
  default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    let username = data.username;
    let content = data.content;
    const imageFile = data.image;
    const arrayBuffer = await imageFile.arrayBuffer();
    let image = Buffer.from(arrayBuffer).toString("base64");
    // console.log(username, content, image);

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
