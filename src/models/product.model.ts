import { User } from "./user.model"

export interface Product {
    id: string
    name: string
    price: number
    quantity: number
    description: string
    image: string
    category: Category
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
    productCart: ProductCart[]
    total: number
    user: User
}