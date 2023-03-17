import { db } from "@/lib/prisma";
import { Response } from "@/models/response.model";
import { User } from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<User>>) {
    try {
        if (req.method === 'POST') {
            const { email, username, password } = req.body
            const created = await db.user.create({
                data: {
                    username: username,
                    email: email,
                    password: password
                }
            })
            console.log(created);
            return res.json({
                status: 200, data: {
                    name: created.username,
                    email: created.email,
                    password: created.password
                }
            })
        }
    } catch (error: any) {
        console.log(error);
        return res.json({
            status: 500,
            error: error.message
        })
    }
}