import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.brand}>e-commerce Shop</Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart ({itemCount})</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottom: "1px solid #eee",
    background: "white",
  },
  brand: { fontWeight: 800, textDecoration: "none", color: "#111" },
  nav: { display: "flex", gap: 12 },
  link: { textDecoration: "none", color: "#111" },
};
