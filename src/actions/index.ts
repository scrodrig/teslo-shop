// export * from "./product/get-product-pagination";
// export * from "./product/get-product-by-slug";
// export * from "./product/get-stock-by-slug";

// 'use server'

import { getPaginatedProductsWithImages } from './product/get-product-pagination'
import { getProductbySlug } from './product/get-product-by-slug'
import { getStockBySlug } from './product/get-stock-by-slug'

export { getPaginatedProductsWithImages, getProductbySlug, getStockBySlug }
