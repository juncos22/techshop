import { api } from "@/lib/axios"
import { Cart, Product, ProductCart } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { PaymentMethod, User } from "@/models/user.model"
import { create } from "zustand"
import { persist } from 'zustand/middleware'

type ProductStates = {
    products: Product[]
    productCarts: ProductCart[]
    paymentMethods: PaymentMethod[]
    cart: Cart
    loading: boolean
    error: string
}

type ProductActions = {
    loadProducts: (categoryName?: string, productName?: string) => void
    addToCart: (productCart: ProductCart, username: string) => void
    deleteFromCart: (productCart: ProductCart) => void
    makePurchase: () => void
    getPaymentMethods: (username: string) => void
}
export const useProductStore = create(
    persist<ProductStates & ProductActions>(
        (set) => (
            {
                error: "",
                loading: false,
                products: [],
                productCarts: [],
                paymentMethods: [],
                cart: {
                    productCarts: [],
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
                async addToCart(productCart, username) {
                    const res = await api.get<Response<User>>(`/account?name=${username}`)
                    set(state => {
                        state.productCarts = [...state.productCarts, productCart]
                        state.cart = {
                            productCarts: state.productCarts,
                            total: state.productCarts.map(pc => pc.subTotal).reduce((acc, i) => acc + i),
                            user: {
                                id: (res.data.data as User).id,
                                name: (res.data.data as User).name
                            }
                        }
                        console.log(state.productCarts);
                        return state
                    })
                },
                deleteFromCart(productCart) {
                    set(state => {
                        if (state.productCarts.find(pc => pc.product.name === productCart.product.name)) {
                            state.productCarts = state.productCarts.filter(pc => pc.product.name !== productCart.product.name)
                        }
                        return state
                    })
                },
                makePurchase() {

                },
                async getPaymentMethods(username) {
                    set(state => ({
                        loading: true
                    }))
                    const res = await api.get<Response<PaymentMethod>>(`/account/paymentMethods/${username}`)
                    if (res.data.status !== 200) {
                        set(state => ({
                            error: res.data.error,
                            loading: false
                        }))
                        return
                    }

                    set(state => ({
                        loading: false,
                        paymentMethods: res.data.data as PaymentMethod[]
                    }))
                },
            }
        ),
        {
            name: 'product-cart'
        }
    )
)
