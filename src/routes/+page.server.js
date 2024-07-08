import { Prisma } from "$lib/prisma"
import prisma from "../lib/prisma"
export const load = (async () => {
      const result = await prisma.post.findMany();

      return { posts: result };
})