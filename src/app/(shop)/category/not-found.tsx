import Link from "next/link";

export default function NotFoundCategoryPage() {
  return (
    <div>
      <h1>404 | Not found</h1>
      <Link href="/">Go back to home</Link>
    </div>
  );
}
