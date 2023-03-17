import { db } from "@/lib/prisma";
import { Response } from "@/models/response.model";
import { User } from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<User>>) {
    try {
        const { username } = req.query
        switch (req.method) {
            case 'GET':
                const account = await db.user.findFirst({
                    where: {
                        username: username as string,
                    }
                })
                return res.json({
                    status: 200,
                    data: {
                        name: account?.username!,
                        email: account?.email!,
                        password: account?.password!
                    }
                })
            // case 'PUT':
            //     const { email, name, password } = req.body
            //     const updated = await db.user.update({
            //         data: {
            //             email: email!,
            //             username: name!,
            //             password: password!
            //         },
            //         where: {
            //             id: id as string
            //         }
            //     })
            //     return res.json({
            //         status: 301,
            //         data: {
            //             name: updated.username!,
            //             email: updated.email!,
            //             password: updated.password!
            //         }
            //     })
            // case 'DELETE':
            //     const deleted = await db.user.delete({
            //         where: {
            //             id: id as string
            //         }
            //     })
            //     return res.json({ status: 200, data: { name: deleted.username! } })
        }
    } catch (error: any) {
        console.log(error);
        return res.json({ status: 500, error: error.message })
    }
}