import { PrismaClient } from "@prisma/client";
import { defineConfig } from "vite";
const prisma = new PrismaClient();
export default prisma;