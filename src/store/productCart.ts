import { api } from "@/lib/axios"
import { Cart, ProductCart } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { User } from "@/models/user.model"
import { loadStripe } from "@stripe/stripe-js"
import { create } from "zustand"

type CartState = {
    productCarts: ProductCart[]
    cart: Cart
    error: string
    loading: boolean
}

type CartActions = {
    addToCart: (productCart: ProductCart, username: string) => void
    deleteFromCart: (productCart: ProductCart) => void
    makePurchase: (cart: Cart, username: string) => void
}

export const useCartStore = create<CartState & CartActions>(
    (set) => ({
        productCarts: [],
        cart: {
            productCarts: [],
            total: 0,
            user: {
                name: ''
            }
        },
        loading: false,
        error: "",
        async addToCart(productCart, username) {
            const res = await api.get<Response<User>>(`/account?name=${username}`)
            set(state => {
                state.productCarts = [...state.productCarts, productCart]
                state.cart = {
                    productCarts: state.productCarts,
                    total: state.productCarts.map(pc => pc.subtotal).reduce((acc, i) => acc + i),
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
            set(state => ({
                productCarts: state.productCarts.filter(pc => pc.product.id !== productCart.product.id),
                cart: {
                    productCarts: state.productCarts.filter(pc => pc.product.id !== productCart.product.id),
                    total: 0
                }
            }))
            set(state => ({
                cart: {
                    productCarts: state.productCarts.filter(pc => pc.product.id !== productCart.product.id),
                    total: state.productCarts.map(pc => pc.subtotal).reduce((acc, i) => acc + i)
                }
            }))
        },
        async makePurchase(cart: Cart, username: string) {
            const response = await api.get<Response<User>>(`/account?name=${username}`)
            set(state => ({
                loading: true
            }))
            const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")
            try {
                const res = await api.post('/stripe_sessions', {
                    cart,
                    userId: (response.data.data as User).id
                })

                const stripe = await stripePromise
                const { error } = await stripe?.redirectToCheckout({ sessionId: res.data.session.id })!
                console.log(error);

                set(state => ({
                    error: error.message,
                    loading: false
                }))
            } catch (error: any) {
                console.log(error);
                set(state => ({
                    error: error.message,
                    loading: false
                }))
            }
        },
    })
)