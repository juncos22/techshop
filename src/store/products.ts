import { api } from "@/lib/axios"
import { Cart, Product, ProductCart } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { PaymentMethod, User } from "@/models/user.model"
import { create } from "zustand"

type ProductStates = {
    products: Product[]
    paymentMethods: PaymentMethod[]
    loading: boolean
    error: string
}

type ProductActions = {
    loadProducts: (categoryName?: string, productName?: string) => void
    getPaymentMethods: (username: string) => void
}
export const useProductStore = create<ProductStates & ProductActions>(
    (set) => (
        {
            error: "",
            loading: false,
            products: [],
            paymentMethods: [],
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
    )
)
