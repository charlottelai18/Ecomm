import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
import Navbar from "../components/Navbar";
import { CartProvider } from "../state/cartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
