// export * from "./product/get-product-pagination";
// export * from "./product/get-product-by-slug";
// export * from "./product/get-stock-by-slug";

// 'use server'

import { authenticate } from './auth/login'
import { getPaginatedProductsWithImages } from './product/get-product-pagination'
import { getProductbySlug } from './product/get-product-by-slug'
import { getStockBySlug } from './product/get-stock-by-slug'
import { logout } from './auth/logout'
import { registerUser } from './auth/register'

export {
  getPaginatedProductsWithImages,
  getProductbySlug,
  getStockBySlug,
  authenticate,
  logout,
  registerUser,
}
