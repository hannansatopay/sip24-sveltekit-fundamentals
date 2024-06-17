import { redirect } from "@sveltejs/kit";
import prisma from "../../lib/server/db";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const content = formData.get("content");

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
      return response;
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      throw redirect(301, "/");
    }
  },
};
