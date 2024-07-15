import prisma from "../../lib/prisma";
export const action={
    default:async({Request})=>{

        const data=Object.fromEntries(await Request.formData());
        let username=data.username;
        let content =data.content;
        let image =Buffer.from(await data.image.arrayBuffer()).toString('base64');
        
        await prisma.post.create({

            data:
            username,
            content,
            image
        })

    }
}