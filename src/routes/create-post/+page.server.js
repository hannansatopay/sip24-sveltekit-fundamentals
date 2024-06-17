import { redirect } from "@sveltejs/kit";
import prisma from "../../lib/server/db";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const content = formData.get("content");
    if (!content) return;

    const image = Buffer.from(
      await formData.get("image").arrayBuffer()
    ).toString("base64");

    // save to database

    try {
      const response = await prisma.post.create({
        data: {
          content,
          image,
          username: "Guest",
        },
      });
      throw redirect(301, "/");
    } catch (error) {
      console.log("Error : ", error);
    }
  },
};
