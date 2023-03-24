import { db } from "@/lib/prisma";
import { cartConverter, Cart } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Cart>>) {
    try {
        const { username } = req.query
        console.log(username);

        if (req.method === 'GET') {
            const userCart = await db.cart.findFirst({
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
            if (!userCart) return res.json({ status: 404 })

            return res.json({
                status: 200,
                data: cartConverter(userCart) as Cart
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