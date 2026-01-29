import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../firebase/productsApi";
import FeaturedCarousel from "../components/FeaturedCarousel";
import ProductGrid from "../components/ProductGrid";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const all = await fetchProducts();
        setProducts(all);
      } catch (e) {
        console.error(e);
        setError("Failed to load products. Check Firestore rules.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Carousel will show favourited products
  const featured = useMemo(
    () => products.filter((p) => p.favourited === true),
    [products]
  );

  if (loading) return <p style={{ padding: 16 }}>Loading…</p>;
  if (error) return <p style={{ padding: 16 }}>{error}</p>;

  return (
    <div style={{ padding: 16 }} className="container">
      <FeaturedCarousel products={featured} />
      <h2>All products</h2>
      <ProductGrid products={products} />
    </div>
  );
}
