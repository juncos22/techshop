import { Cart } from "@/models/product.model";
import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cart = req.body as Cart
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
            apiVersion: "2022-11-15"
        })
        cart.productCarts.map(async pc => {
            const product = await stripe.products.create({
                name: pc.product.name,
                description: pc.product.description,
                url: pc.product.image,
                active: true,
                unit_label: `${pc.quantity} units.`,
                default_price_data: {
                    unit_amount: pc.subTotal,
                    currency: 'USD'
                }
            })
            console.log(product);
        })


        const params: Stripe.Checkout.SessionCreateParams = {
            submit_type: 'donate',
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems.data.map(li => ({
                price: li.default_price,
                quantity: li.
            })),
            success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        };
        const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
        console.log(session);
        return res.status(200).json({ session })

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}