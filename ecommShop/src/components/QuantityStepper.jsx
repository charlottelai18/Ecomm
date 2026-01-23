export default function QuantityStepper({ value, min = 1, max = 99, onChange }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div style={styles.wrap}>
      <button onClick={dec} disabled={value <= min} style={styles.btn}>
        −
      </button>
      <div style={styles.value}>{value}</div>
      <button onClick={inc} disabled={value >= max} style={styles.btn}>
        +
      </button>
    </div>
  );
}

const styles = {
  wrap: { display: "inline-flex", alignItems: "center", gap: 8 },
  btn: { width: 32, height: 32 },
  value: { minWidth: 24, textAlign: "center", fontWeight: 700 },
};
