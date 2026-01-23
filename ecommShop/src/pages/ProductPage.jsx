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

    // must pick both
    if (!selected.colour || !selected.size) {
      return { variantKey: "incomplete", maxStock: 0 };
    }

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

  const canAdd =
    variantKey !== "incomplete" && maxStock > 0 && inCartQty < maxStock;

  if (loading) return <p style={{ padding: 16 }}>Loading…</p>;
  if (!product) return <p style={{ padding: 16 }}>Product not found.</p>;

  return (
    <div style={styles.layout}>
      <img src={product.imageUrl} alt={product.name} style={styles.img} />

      <div style={styles.info}>
        <h1 style={{ margin: 0 }}>{product.name}</h1>
        <p style={{ margin: 0 }}>${Number(product.price).toFixed(2)}</p>

        <VariantSelector
          variants={product.variants}
          selected={selected}
          onChange={setSelected}
        />

        <p style={{ margin: 0, opacity: 0.8 }}>
          Stock: {variantKey === "incomplete" ? "Select options" : maxStock}
        </p>

        <button
          disabled={!canAdd}
          onClick={() =>
            dispatch({
              type: "ADD_ITEM",
              payload: {
                key: cartKey,
                productId: id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                variantKey, // sku
                maxStock,
              },
            })
          }
          style={styles.btn}
        >
          {canAdd ? "Add to cart" : "Out of stock / Max reached"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    padding: 16,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  },
  img: { width: "100%", borderRadius: 12, objectFit: "cover" },
  info: { display: "grid", gap: 12, alignContent: "start" },
  btn: { padding: "10px 12px", borderRadius: 10 },
};
