import { CartItem } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  getTotalItems: () => number
  // removeFromCart: (id: string) => void
  // updateQuantity: (id: string, quantity: number) => void
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
    }),
    {
      name: 'shopping-cart',
    }
  )
)
