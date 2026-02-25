import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../firebase/productsApi";
import VariantSelector from "../components/VariantSelector";
import { useCart } from "../state/cartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { state, dispatch } = useCart();

  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState({ colour: "", size: "" });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const p = await fetchProductById(id);
      setProduct(p);
      setLoading(false);
    })();
  }, [id]);

  const { variantKey, maxStock } = useMemo(() => {
    if (!product?.variants?.length) return { variantKey: "incomplete", maxStock: 0 };
    if (!selected.colour || !selected.size) return { variantKey: "incomplete", maxStock: 0 };

    const match = product.variants.find(
      (v) => v.colour === selected.colour && v.size === selected.size
    );

    return {
      variantKey: match?.sku || "incomplete",
      maxStock: match?.stock ?? 0,
    };
  }, [product, selected]);

  const cartKey = `${id}__${variantKey}`;
  const inCartQty = state.items[cartKey]?.qty || 0;
  const canAdd = variantKey !== "incomplete" && maxStock > 0 && inCartQty < maxStock;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        key: cartKey,
        productId: id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        variantKey,
        maxStock,
      },
    });
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  if (loading) {
    return (
      <div className="state-wrapper">
        <div className="spinner" />
        <span>Loading product…</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="state-wrapper">
        <span>😕 Product not found.</span>
      </div>
    );
  }

  return (
    <>
      <div className="product-layout">
        <div className="product-image-wrap">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-info">
          <h1 className="product-info__name">{product.name}</h1>
          <p className="product-info__price">${Number(product.price).toFixed(2)}</p>

          <VariantSelector
            variants={product.variants}
            selected={selected}
            onChange={setSelected}
          />

          <div className="product-info__stock">
            {variantKey === "incomplete"
              ? "📦 Select options to see stock"
              : `📦 ${maxStock} in stock`}
          </div>

          {inCartQty > 0 && (
            <p style={{ fontSize: 13, color: "#6b7c72" }}>
              ✅ {inCartQty} already in your cart
            </p>
          )}

          <button
            disabled={!canAdd}
            onClick={handleAddToCart}
            className="product-info__add-btn"
          >
            {canAdd ? "🛒 Add to Cart" : "Out of Stock / Max Reached"}
          </button>
        </div>
      </div>

      {toast && (
        <div className="toast">
          <span className="toast__icon">🎉</span>
          <span>{product.name} added to cart!</span>
        </div>
      )}
    </>
  );
}
