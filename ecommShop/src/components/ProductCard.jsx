import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {product.favourited && (
        <span className="product-card__badge">⭐ Featured</span>
      )}

      <div className="product-card__image-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-card__img" />
      </div>

      <div className="product-card__body">
        <div className="product-card__row">
          <h3 className="product-card__name">{product.name}</h3>
          {product.favourited && (
            <span className="product-card__fav" title="Favourited">❤️</span>
          )}
        </div>
        <p className="product-card__price">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
