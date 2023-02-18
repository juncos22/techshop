import { api } from "@/lib/axios"
import { Product } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { products } from "@/tempdata/products"
import { create } from "zustand"

type ProductStates = {
    products: Product[]
    loading: boolean
    error: string
}

type ProductActions = {
    loadProducts: () => void
}
export const useProductStore = create<ProductStates & ProductActions>(
    (set) => (
        {
            error: "",
            loading: false,
            products: [],
            async loadProducts() {
                set(state => ({
                    loading: true
                }))
                const res = await api.get<Response<Product[]>>('/products')
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
        }
    ))
