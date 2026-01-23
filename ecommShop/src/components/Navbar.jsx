import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>e-commerce Shop</Link>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/cart" style={styles.link}>Cart ({itemCount})</Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(255,255,255,0.95)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  inner: {
    maxWidth: "var(--max)",
    margin: "0 auto",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { fontWeight: 800, textDecoration: "none", color: "#111" },
  nav: { display: "flex", gap: 14, alignItems: "center" },
  link: { textDecoration: "none", color: "#111", fontWeight: 600 },
};
