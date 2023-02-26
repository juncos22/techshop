import { Product } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { products } from "@/tempdata/products";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<Response<Product>>) {
    try {
        const { categoryName, productName } = req.query
        if (categoryName) {
            const filteredProducts = products.filter(p => p.category.name === categoryName as string)
            return res.json({ data: filteredProducts, status: 200 })
        }
        if (productName) {
            const filteredProducts = products.filter(p => p.name.toLowerCase().includes((productName as string).toLowerCase()))
            return res.json({ data: filteredProducts, status: 200 })
        }
        return res.json({ data: products, status: 200 })
    } catch (error: any) {
        console.log(error);
        return res.json({ error: error.message, status: 500 })
    }
}