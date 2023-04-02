import { db } from "@/lib/prisma";
import { Product } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Product>>) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.NEXTAUTH_URL,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { categoryName, productName } = req.query
        console.log(categoryName, productName);

        const filterOptions = []
        let options = {
            include: {
                category: true
            },
            where: {}
        }
        if (categoryName) {
            filterOptions.push({
                category: {
                    name: {
                        contains: (categoryName as string)[0].toUpperCase() + (categoryName as string).slice(1)
                    }
                }
            })
        }
        if (productName) {
            filterOptions.push({
                name: {
                    contains: (productName as string)[0].toUpperCase() + (productName as string).slice(1)
                }
            })
        }
        if (filterOptions.length) {
            options = {
                ...options,
                where: {
                    OR: filterOptions
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