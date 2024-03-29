import { api } from "@/lib/axios"
import { Cart, ProductCart } from "@/models/product.model"
import { Response } from "@/models/response.model"
import { User } from "@/models/user.model"
import { PaymentIntent } from "@stripe/stripe-js"
import { create } from "zustand"

type CartState = {
    productCarts: ProductCart[]
    cart: Cart
    error: string
    loading: boolean
    payment?: PaymentIntent
}

type CartActions = {
    addToCart: (productCart: ProductCart, username: string) => void
    deleteFromCart: (productCart: ProductCart) => void
    makePurchase: (cart: Cart, paymentMethodId: string) => void
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
                    total: state.productCarts.length ? state.productCarts.map(pc => pc.subtotal).reduce((acc, i) => acc + i) : 0
                }
            }))
        },
        async makePurchase(cart: Cart, paymentMethodId) {
            try {
                // const response = await api.get<Response<User>>(`/account?name=${username}`)
                set(state => ({
                    ...state,
                    loading: true
                }))
                const res = await api.post('/payment', {
                    cart,
                    paymentMethodId
                })

                if (res.status === 200) {
                    set(state => (
                        {
                            ...state,
                            loading: false,
                            payment: res.data as PaymentIntent,
                            cart: {
                                total: 0,
                                productCarts: []
                            },
                            productCarts: []
                        }
                    ))
                } else {
                    set(state => ({
                        loading: false,
                        error: "Could not made the purchase"
                    }))
                }
            } catch (error: any) {
                console.log(error);
                set(state => ({
                    error: error.message,
                    loading: false
                }))
            }
        }
    })
)