import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import Jimp from 'jimp';

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const username = formData.username;
        const content = formData.content;
        const imageBuffer = Buffer.from(await formData.image.arrayBuffer());
        const filter = formData.filter;

        try {
            const filteredImageBase64 = await applyFilter(imageBuffer, filter);

            await prisma.post.create({
                data: {
                    username,
                    content,
                    image: filteredImageBase64,
                    filter
                }
            });
            throw redirect(302, "/");
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }
};

// Function to apply filter to the image
async function applyFilter(imageBuffer, filter) {
    const image = await Jimp.read(imageBuffer);

    switch (filter) {
        case 'clarendon':
            image.contrast(0.5).color([{ apply: 'saturate', params: [15] }]);
            break;
        case 'gingham':
            image.brightness(0.1).color([{ apply: 'hue', params: [-10] }]);
            break;
        case 'moon':
            image.greyscale().contrast(0.1);
            break;
        case 'lark':
            image.brightness(0.2).color([{ apply: 'saturate', params: [20] }]);
            break;
        case 'reyes':
            image.brightness(0.2).sepia();
            break;
        default:
            // If no filter or unknown filter is provided, return the original image
            return imageBuffer.toString('base64');
    }

    const filteredImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    return filteredImageBuffer.toString('base64');
}
