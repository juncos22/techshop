import { products } from "../src/tempdata/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
async function main() {
    // const paymentInfo = await prisma.paymentInfo.create({
    //     data: {
    //         nameOnCard: 'Nicolas Eduardo Juncos',
    //         cardNumber: '1234 1234 1234 1234',
    //         address: 'Calle falsa 123',
    //         cardCode: 123,
    //         expireMonth: 6,
    //         expireYear: 2025,
    //         userCardId: '64142241c8ba6fd2bc873ddc'
    //     }
    // })
    // console.log(paymentInfo);

    // products.map(async p => {
    //     const product = await prisma.product.create({
    //         data: {
    //             name: p.name,
    //             description: p.description,
    //             image: p.image,
    //             price: p.price,
    //             quantity: p.quantity,
    //             category: {
    //                 create: {
    //                     name: p.category.name
    //                 }
    //             }
    //         }
    //     })
    //     console.log(product);
    // })
}

main()
    .catch(error => {
        console.log(error);
        process.exit(1)
    })