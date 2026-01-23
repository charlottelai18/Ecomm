import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={styles.card}>
      <div style={styles.imageWrap}>
        <img src={product.imageUrl} alt={product.name} style={styles.img} />
      </div>

      <div style={styles.row}>
        <h3 style={styles.name}>{product.name}</h3>
        {product.favourited ? <span title="Favourited">❤️</span> : null}
      </div>

      <p style={styles.price}>${Number(product.price).toFixed(2)}</p>
    </Link>
  );
}

const styles = {
  card: {
    display: "block",
    textDecoration: "none",
    color: "#111",
    background: "white",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 12,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    borderRadius: 10,
    background: "#f3f3f3",
  },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  row: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: { margin: 0, fontSize: 16, lineHeight: 1.2 },
  price: { margin: "6px 0 0", opacity: 0.8 },
};
