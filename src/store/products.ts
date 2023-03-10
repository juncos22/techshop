import { api } from "@/lib/axios"
import { Cart, Product, ProductCart } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { User } from "@/models/user.model"
import { products } from "@/tempdata/products"
import { create } from "zustand"

type ProductStates = {
    products: Product[]
    productCart: ProductCart[]
    cart: Cart
    loading: boolean
    error: string
}

type ProductActions = {
    loadProducts: (categoryName?: string, productName?: string) => void
    addToCart: (productCart: ProductCart) => void
    makePurchase: () => void
}
export const useProductStore = create<ProductStates & ProductActions>(
    (set) => (
        {
            error: "",
            loading: false,
            products: [],
            productCart: [],
            cart: {
                productCart: [],
                total: 0,
                user: {
                    name: ''
                }
            },
            async loadProducts(categoryName, productName) {
                set(state => ({
                    loading: true
                }))
                let params = ""
                if (categoryName) params += `categoryName=${categoryName}&`
                if (productName) params += `productName=${productName}&`

                const res = await api.get<Response<Product>>(`/products?${params}`)
                if (res.status !== 200) {
                    set(state => ({
                        loading: false,
                        error: res.data.error
                    }))
                    return
                }
                set(state => ({
                    loading: false,
                    products: res.data.data as Product[]
                }))
            },
            addToCart(productCart) {
                set(state => {
                    state.productCart = [...state.productCart, productCart]
                    console.log(state.productCart);
                    return state
                })
            },
            makePurchase() {
                set(state => {
                    state.cart = {
                        productCart: state.productCart,
                        total: state.productCart.map(pc => pc.subTotal).reduce((acc, i) => acc + i),
                        user: {
                            name: 'Roberto'
                        }
                    }
                    console.log(state.cart);
                    return state
                })
            },
        }
    ))
