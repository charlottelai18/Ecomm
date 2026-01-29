export default function VariantSelector({ variants, selected, onChange }) {
  const colours = [...new Set(variants.map((v) => v.colour).filter(Boolean))];
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  return (
    <div className="variant-group">
      <label className="variant-label">
        Colour
        <div className="variant-select">
          <select
            value={selected.colour || ""}
            onChange={(e) =>
              onChange({ ...selected, colour: e.target.value })
            }
          >
            <option value="">Select…</option>
            {colours.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className="variant-label">
        Size
        <div className="variant-select">
          <select
            value={selected.size || ""}
            onChange={(e) =>
              onChange({ ...selected, size: e.target.value })
            }
          >
            <option value="">Select…</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  );
}
