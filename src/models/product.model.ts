import { User } from "./user.model"

export interface Product {
    id: string
    name: string
    price: number
    quantity: number
    description: string
    image: string
    category?: Category
}

export interface Category {
    id: string
    name: string
}

export interface ProductCart {
    product: Product
    quantity: number
    subTotal: number
}

export interface Cart {
    productCarts: ProductCart[]
    total: number
    user: User
}

export function cartConverter(cart: any): Cart {
    return {
        productCarts: cart.productCarts !== null ? cart.productCarts?.map((pc: ProductCart) => (
            {
                product: {
                    name: pc.product.name,
                    description: pc.product.description,
                    price: pc.product.price,
                    quantity: pc.product.quantity,
                    image: pc.product.image,
                    id: pc.product.id
                },
                quantity: pc.quantity,
                subTotal: pc.subTotal,
            }
        )) : [],
        total: cart?.total!,
        user: {
            name: cart?.user.username!,
            email: cart?.user.email,
            password: cart?.user.password,
            id: cart?.user.id
        }
    }
}