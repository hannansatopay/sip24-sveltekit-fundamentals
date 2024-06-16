import { redirect } from "@sveltejs/kit";
import prisma from "../../lib/prisma.js";

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const username = data.username;
        const content = data.content;

        // Original image data (assuming it's uploaded normally)
        let image = Buffer.from(await data.image.arrayBuffer()).toString(
            "base64"
        );

        // Filtered image data from canvas
        let filteredImageData = null;
        if (data.filteredImageData) {
            filteredImageData = data.filteredImageData.split(";base64,")[1];
        }

        // Determine which image data to use for upload
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