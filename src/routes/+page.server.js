import prisma from "../lib/prisma";

export const load = async () => {
  const result = await prisma.post.findMany({
    // Sort by date in descending order
    orderBy: {
      createdAt: "desc",
    },
  });
  return { posts: result };
};