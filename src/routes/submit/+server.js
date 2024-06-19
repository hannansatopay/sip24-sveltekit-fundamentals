import { json, error } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function POST({ request }) {
    try {
        const body = await request.json();
        const { username, content, imageData, filter } = body;

        // Validate input
        if (!username.trim()) {
            throw error(400, 'Username is required');
        }

        // Save image data to database using Prisma
        const savedImageData = await prisma.post.create({
            data: {
                username,
                content,
                imageData,
                filter // Store the filter used if necessary
            }
        });

        console.log('Saved image data:', savedImageData);

        // Respond with success
        return json({ success: true });
    } catch (err) {
        console.error('Error processing form submission:', err);
        throw error(500, 'Error processing form submission');
    }
}
