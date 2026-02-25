export default function QuantityStepper({ value, min = 1, max = 99, onChange }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="qty-stepper">
      <button
        onClick={dec}
        disabled={value <= min}
        className="qty-stepper__btn"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="qty-stepper__value">{value}</div>
      <button
        onClick={inc}
        disabled={value >= max}
        className="qty-stepper__btn"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
