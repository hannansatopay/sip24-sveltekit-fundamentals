import { redirect } from "@sveltejs/kit";
import prisma from "../../lib/prisma.js";

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const username = data.username;
        const content = data.content;

        let image = Buffer.from(await data.image.arrayBuffer()).toString(
            "base64"
        );

        let filteredImageData = null;
        if (data.filteredImageData) {
            filteredImageData = data.filteredImageData.split(";base64,")[1];
        }

        const imageDataToUpload = filteredImageData || image;

        await prisma.post.create({
            data: {
                username,
                content,
                image: imageDataToUpload,
            },
        });

        return redirect(302, "/");
    },
};

  
