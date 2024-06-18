import prisma from "../lib/server/db";

export const load = async () => {
  try {
    const result = await prisma.post.findMany();
    return { posts: result };
  } catch (error) {
    console.log(error);
    return error;
  }
};
