import { Link } from "react-router-dom";

export default function FeaturedCarousel({ products }) {
  if (!products?.length) return null;

  return (
    <section className="featured-section">
      <h2 className="featured-title">Featured Picks</h2>

      <div className="featured-row">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="featured-item">
            <div className="featured-item__img-wrap">
              <img src={p.imageUrl} alt={p.name} className="featured-item__img" />
            </div>
            <div className="featured-item__label">{p.name}</div>
            <div className="featured-item__badge">Featured</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
