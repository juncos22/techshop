import { db } from "@/lib/prisma";
import { Response } from "@/models/response.model";
import { PaymentMethod } from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<PaymentMethod>>
) {
    try {
        const { username } = req.query
        const userPaymentMethods = await db.paymentInfo.findMany({
            where: {
                userCard: {
                    username: username as string
                }
            }
        })
        console.log(userPaymentMethods);

        return res.json({
            status: 200,
            data: userPaymentMethods.map(pm => ({
                nameOnCard: pm.nameOnCard,
                address: pm.address,
                cardCode: pm.cardCode,
                cardNumber: pm.cardNumber,
                expireMonth: pm.expireMonth,
                expireYear: pm.expireYear,
                userCard: {
                    id: pm.userCardId,
                    name: username as string
                },
                id: pm.id
            }))
        })
    } catch (error: any) {
        console.log(error);
        return res.json({
            status: 500,
            error: error.message
        })
    }
}