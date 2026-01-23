export default function VariantSelector({ variants, selected, onChange }) {
  const colours = [...new Set(variants.map((v) => v.colour).filter(Boolean))];
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  return (
    <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
      <label style={{ display: "grid", gap: 6 }}>
        Colour
        <select
          value={selected.colour || ""}
          onChange={(e) => onChange({ ...selected, colour: e.target.value })}
        >
          <option value="">Select…</option>
          {colours.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        Size
        <select
          value={selected.size || ""}
          onChange={(e) => onChange({ ...selected, size: e.target.value })}
        >
          <option value="">Select…</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
