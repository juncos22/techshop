import { db } from "@/lib/prisma";
import { Response } from "@/models/response.model";
import { User } from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<User>>) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT', 'POST'],
            origin: process.env.NEXTAUTH_URL,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id, name } = req.query
        const { email, username, password } = req.body

        switch (req.method) {
            case 'GET':
                const account = await db.user.findFirst({
                    include: {
                        carts: {
                            include: {
                                productCarts: {
                                    include: {
                                        product: true
                                    }
                                }
                            }
                        }
                    },
                    where: {
                        username: name as string,
                    }
                })
                return res.json({
                    status: 200,
                    data: {
                        id: account?.id,
                        name: account?.username!,
                        email: account?.email!,
                        password: account?.password!,
                        carts: account?.carts.map(c => ({
                            productCarts: c.productCarts,
                            total: c.total
                        }))
                    }
                })
            case 'POST':
                const created = await db.user.create({
                    data: {
                        username: username as string,
                        email: email,
                        password: password
                    }
                })
                console.log(created);
                return res.json({
                    status: 200, data: {
                        name: created.username,
                        email: created.email,
                        password: created.password
                    }
                })
            case 'PUT':
                const updated = await db.user.update({
                    data: {
                        email: email!,
                        username: username!,
                        password: password!
                    },
                    where: {
                        id: id as string
                    }
                })
                return res.json({
                    status: 200,
                    data: {
                        name: updated.username!,
                        email: updated.email!,
                        password: updated.password!
                    }
                })
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