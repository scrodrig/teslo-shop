import { Product } from "@/interfaces";

interface ProductGridProps {
  products: Product[];
}
export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-col-2 sm:grid-col-3 gap-10 mb-10">
      {products.map((product) => {
        return <span key={product.slug}>{product.title}</span>;
      })}
    </div>
  );
};
