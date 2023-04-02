import { db } from "@/lib/prisma";
import { cartConverter, Cart } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Cart>>) {
    try {
        const { username } = req.query

        if (req.method === 'GET') {
            const userCarts = await db.cart.findMany({
                include: {
                    productCarts: {
                        include: {
                            product: true
                        }
                    },
                    user: true
                },
                where: {
                    user: {
                        username: username as string
                    }
                }
            })

            console.log(userCarts);

            return res.json({
                status: 200,
                data: userCarts.map(uc => cartConverter(uc) as Cart) as Cart[]
            })
        } else {
            return res.json({
                status: 405
            })
        }
    } catch (error: any) {
        console.log(error);
        return res.json({
            status: 500,
            error: error.message
        })
    }
}