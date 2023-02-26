import { Product } from "@/models/product.model";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from '@/models/response.model'
import { products } from "@/tempdata/products";

export default function handler(req: NextApiRequest, res: NextApiResponse<Response<Product>>) {
    try {
        const { id } = req.query
        const product = products.find(p => p.id === id as string)
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