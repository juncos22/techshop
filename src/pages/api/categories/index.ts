import { db } from "@/lib/prisma";
import { Category } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Category>>
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.NEXTAUTH_URL,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const categories = await db.category.findMany()
        return res.json({ status: 200, data: categories })
    } catch (error: any) {
        console.log(error);
        return res.json({ status: 500, error: error.message })
    }
}