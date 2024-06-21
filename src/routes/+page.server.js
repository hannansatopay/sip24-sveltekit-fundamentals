import prisma from "$lib/prisma";

export const load = async () => {
  const results = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return { posts: results };
};
