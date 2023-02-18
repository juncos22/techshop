import { Product } from "@/models/product.model";
import { Response } from "@/models/response.model";
import { products } from "@/tempdata/products";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<Response<Product[]>>) {
    try {
        return res.json({
            status: 200,
            data: products
        })
    } catch (error: any) {
        console.log(error);

        return res.json({
            status: 500,
            error: error.message
        })
    }
}