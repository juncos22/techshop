
import { db } from "@/lib/prisma";
import { Cart, ProductCart } from "@/models/product.model";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { Stripe } from "stripe";

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

            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
                apiVersion: "2022-11-15"
            })

            cart.productCarts.map(async pc => {
                const product = await stripe.products.create({
                    name: pc.product.name,
                    images: [pc.product.image],
                    active: true,
                    description: pc.product.description,
                    default_price_data: {
                        unit_amount: pc.subtotal,
                        currency: 'USD',
                    },
                })
                console.log(product);
            })

            const params: Stripe.Checkout.SessionCreateParams = {
                submit_type: 'donate',
                payment_method_types: ['card', 'customer_balance', 'us_bank_account'],
                mode: 'payment',
                line_items: cart.productCarts.map((pc: ProductCart) => ({
                    price_data: {
                        currency: 'USD',
                        unit_amount: pc.subtotal,
                        product_data: {
                            name: pc.product.name,
                            description: pc.product.description,
                            images: [pc.product.image],
                        }
                    },
                    quantity: pc.quantity
                })),
                success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            };
            const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
            // console.log(session);
            const createdCart = await db.cart.create({
                data: {
                    total: cart.total,
                    userId: cart.user.id!,
                    productCarts: {
                        createMany: {
                            data: cart.productCarts.map(pc => ({
                                productId: pc.product.id!,
                                quantity: pc.quantity,
                                subtotal: pc.subtotal,
                            }))
                        }
                    }
                }
            })
            console.log(createdCart);

            // cart.productCarts.map(async pc => {
            //     await db.productCart.create({
            //         data: {
            //             product: {
            //                 connect: {
            //                     id: pc.product.id!
            //                 }
            //             },
            //             quantity: pc.quantity,
            //             subtotal: pc.subtotal,
            //             cart: {
            //                 create: {
            //                     total: cart.total,
            //                     user: {
            //                         connect: {
            //                             id: cart.user.id
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     })
            // })
            return res.status(200).json({ session })
        } else {
            return res.status(400).send("Bad Request")
        }

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}