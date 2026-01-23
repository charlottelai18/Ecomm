import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 16 }}>
      <h1>Product Page</h1>
      <p>Product id: {id}</p>
    </div>
  );
}