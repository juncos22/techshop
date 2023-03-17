import { products } from "../src/tempdata/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
async function main() {

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