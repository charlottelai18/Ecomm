import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../firebase/productsApi";
import FeaturedCarousel from "../components/FeaturedCarousel";
import ProductGrid from "../components/ProductGrid";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

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

  const featured = useMemo(
    () => products.filter((p) => p.favourited === true),
    [products]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (loading) {
    return (
      <div className="state-wrapper">
        <div className="spinner" />
        <span>Loading products…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper">
        <span>⚠️ {error}</span>
      </div>
    );
  }

  return (
    <div className="container">
      <FeaturedCarousel products={featured} />

      <h2 className="section-heading">All Products</h2>

      {/* Search bar */}
      <div className="search-bar">
        <span className="search-bar__icon">🔍</span>
        <input
          type="text"
          placeholder="Search for treats, toys, beds…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
