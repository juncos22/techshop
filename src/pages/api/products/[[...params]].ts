import { db } from "@/lib/prisma";
import { Product } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Product>>) {
    try {
        const { categoryName, productName } = req.query
        const filterOptions = []
        let options = {}
        if (categoryName) {
            filterOptions.push({
                category: {
                    name: {
                        contains: (categoryName as string).toLowerCase()
                    }
                }
            })
        }
        if (productName) {
            filterOptions.push({
                name: (productName as string).toLowerCase()
            })
        }
        if (filterOptions.length) {
            options = {
                where: {
                    AND: filterOptions
                }
            }
        }
        const products = await db.product.findMany(options)
        return res.json({ data: products, status: 200 })
    } catch (error: any) {
        console.log(error);
        return res.json({ error: error.message, status: 500 })
    }
}