import { Link } from "react-router-dom";

export default function FeaturedCarousel({ products }) {
  if (!products?.length) return null;

  return (
    <section style={{ marginBottom: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Featured</h2>

      <div style={styles.row}>
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={styles.item}>
            <img src={p.imageUrl} alt={p.name} style={styles.img} />
            <div style={styles.label}>{p.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 8,
  },
  item: {
    minWidth: 190,
    textDecoration: "none",
    color: "#000000ff",
    border: "1px solid #eee",
    borderRadius: 12,
    background: "white",
    padding: 10,
  },
  img: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 10,
  },
  label: { marginTop: 8, fontWeight: 600, fontSize: 14 },
};
