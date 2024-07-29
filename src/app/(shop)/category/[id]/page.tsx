import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params: { id } }: CategoryPageProps) {
  if (id === "kids") {
    notFound();
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}
