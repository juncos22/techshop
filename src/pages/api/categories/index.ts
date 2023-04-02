import { db } from "@/lib/prisma";
import { Category } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Category>>
) {
    try {
        const categories = await db.category.findMany()
        return res.json({ status: 200, data: categories })
    } catch (error: any) {
        console.log(error);
        return res.json({ status: 500, error: error.message })
    }
}