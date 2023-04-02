import { api } from "@/lib/axios"
import { Category } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { create } from "zustand"

type CategoryState = {
    categories: Category[]
    error: string
}

type CategoryActions = {
    loadCategories: () => void
}

export const useCategoryStore = create<CategoryState & CategoryActions>(
    (set) => ({
        categories: [],
        error: "",
        async loadCategories() {
            const res = await api.get<Response<Category>>('/categories')
            if (res.status !== 200) {
                set(state => ({
                    error: res.data.error
                }))
                return
            }
            set(state => ({
                categories: res.data.data as Category[]
            }))
        },
    })
)