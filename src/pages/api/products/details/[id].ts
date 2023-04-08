import { Product } from "@/models/product.model";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from '@/models/response.model'
import { db } from "@/lib/prisma";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Product>>) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT'],
            origin: process.env.NEXTAUTH_URL,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        const product = await db.product.findUnique({
            include: {
                category: true,
            },
            where: {
                id: id as string
            }
        })
        if (product) {
            switch (req.method) {
                case 'GET':
                    return res.json({ status: 200, data: product as Product })
                case 'PUT':
                    const data = req.body as Product
                    product.name = data.name
                    product.price = data.price
                    product.quantity = data.quantity
                    return res.json({ status: 200, data: product as Product })
                default:
                    return res.json({ status: 403, error: 'Method not allowed' })
            }

        } else {
            return res.json({ status: 404, error: 'Product not found' })
        }

    } catch (error: any) {
        console.log(error);
        return res.json({ status: 500, error: error.message })
    }
}