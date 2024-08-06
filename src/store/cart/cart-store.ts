import { CartItem } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  getTotalItems: () => number
  updateProductQuantity: (product: CartItem, quantity: number) => void
  removeFromCart: (product: CartItem) => void
  getSummaryInformation: () => {
    totalItems: number
    subTotal: number
    totalPrice: number
    tax: number
  }
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item: CartItem) => {
        const { cart } = get()

        //1. See if the product is already in the cart
        const productInCart = cart.some(
          (cartItem) => cartItem.id === item.id && cartItem.size === item.size
        )

        if (!productInCart) {
          set({ cart: [...cart, item] })
          return
        }

        //2. If it is, update the quantity

        const updatedCartProducts = cart.map((cartItem) => {
          if (cartItem.id === item.id && cartItem.size === item.size) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          }
          return cartItem
        })

        //3. Update the cart
        set({ cart: updatedCartProducts })
      },
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      updateProductQuantity: (product: CartItem, quantity: number) => {
        const { cart } = get()

        const updatedCartProducts = cart.map((cartItem) => {
          if (cartItem.id === product.id && cartItem.size === product.size) {
            return {
              ...cartItem,
              quantity,
            }
          }
          return cartItem
        })

        set({ cart: updatedCartProducts })
      },
      removeFromCart: (product: CartItem) => {
        const { cart } = get()

        const updatedCartProducts = cart.filter(
          (cartItem) => cartItem.id !== product.id || cartItem.size !== product.size
        )

        set({ cart: updatedCartProducts })
      },
      getSummaryInformation: () => {
        const { cart } = get()

        const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
        const subTotal = cart.reduce((subTotal, item) => subTotal + item.price * item.quantity, 0)
        const tax = subTotal * 0.23
        const totalPrice = subTotal + tax

        return { totalItems, subTotal, tax, totalPrice }
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
)
