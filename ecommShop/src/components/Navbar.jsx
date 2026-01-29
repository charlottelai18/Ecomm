import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navBar">
      <div className="container">
        <div className="navInner">
          <Link to="/" className="brand">Pawrific</Link>

          <nav className="navLinks">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart ({itemCount})</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}