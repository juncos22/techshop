
import { db } from "@/lib/prisma";
import { Cart } from "@/models/product.model";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { Stripe } from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2022-11-15"
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['POST'],
            origin: process.env.NEXTAUTH_URL,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        if (req.method === 'POST') {
            const cart = req.body as Cart
            const paymentIntent = await stripe.paymentIntents.create({
                amount: cart.total * 100,
                currency: 'usd',
                description: "Product purchase",
                payment_method_types: ["card"]
            })
            await db.cart.create({
                data: {
                    total: cart.total,
                    userId: cart.user?.id!,
                    productCarts: {
                        createMany: {
                            data: cart.productCarts.map((pc) => ({
                                productId: pc.product.id!,
                                quantity: pc.quantity,
                                subtotal: pc.subtotal,
                            }))
                        }
                    }
                }
            })

            cart.productCarts.map(async (pc) => {
                const product = await db.product.findUnique({ where: { id: pc.product.id! } })
                await db.product.update({
                    data: {
                        quantity: product?.quantity! - pc.quantity
                    },
                    where: {
                        id: product?.id
                    }
                })
            })
            return res.status(200).json(paymentIntent)
        } else {
            return res.status(400).send("Bad Request")
        }

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}