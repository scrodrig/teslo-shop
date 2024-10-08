// export * from "./product/get-product-pagination";
// export * from "./product/get-product-by-slug";
// export * from "./product/get-stock-by-slug";

// 'use server'

import { authenticate } from './auth/login'
import { changeUserRole } from './user/change-user-role'
import { createUpdateProduct } from './product/create-update-product'
import { deleteProductImage } from './product/delete-product-image'
import { deleteUserAddress } from './address/delete-user-address'
import { getCategories } from './categories/get-categories'
import { getCountry } from './country/get-country'
import { getOrderByID } from './order/get-order-by-id'
import { getOrderByUserId } from './order/get-orders-by-user'
import { getPaginatedOrders } from './order/get-paginated-orders'
import { getPaginatedProductsWithImages } from './product/get-product-pagination'
import { getPaginatedUsers } from './user/get-paginated-users'
import { getProductbySlug } from './product/get-product-by-slug'
import { getStockBySlug } from './product/get-stock-by-slug'
import { getUserAddress } from './address/get-user-address'
import { logout } from './auth/logout'
import { paypalCheckPayment } from './payments/paypal/paypal-payment'
import { placeOrder } from './order/place-order'
import { registerUser } from './auth/register'
import { setTransactionId } from './payments/set-transaction-id'
import { setUserAddress } from './address/set-user-address'

export {
  getPaginatedProductsWithImages,
  getProductbySlug,
  getStockBySlug,
  authenticate,
  logout,
  registerUser,
  getCountry,
  setUserAddress,
  deleteUserAddress,
  getUserAddress,
  placeOrder,
  getOrderByID,
  getOrderByUserId,
  setTransactionId,
  paypalCheckPayment,
  getPaginatedOrders,
  getPaginatedUsers,
  changeUserRole,
  getCategories,
  createUpdateProduct,
  deleteProductImage,
}
