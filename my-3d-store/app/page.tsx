import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <header style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        color: "white",
        textAlign: "center",
        padding: "100px 20px",
      }}>
        <h2 style={{ fontSize: "52px", fontWeight: 700, marginBottom: "15px" }}>
          Custom 3D Printed Items Made With Care
        </h2>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
          Unique designs, printed just for you.
        </p>
        <a href="/products" style={{
          display: "inline-block",
          backgroundColor: "#e94560",
          color: "white",
          padding: "14px 32px",
          borderRadius: "50px",
          fontSize: "15px",
          fontWeight: 600,
          textDecoration: "none",
        }}>
          Browse Products
        </a>
      </header>

      {/* Featured products - just show 3 */}
      <section id="products" style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", marginBottom: "30px" }}>
          Featured Products
        </h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </section>

      {/* About section */}
      <section id="about" style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", marginBottom: "30px" }}>About Me</h2>
        <p style={{ fontSize: "16px", color: "#555", maxWidth: "600px" }}>
          I'm passionate about 3D printing and creating useful, beautiful items.
          Every product is designed and printed by me with attention to detail.
        </p>
      </section>

      {/* Contact section */}
      <section id="contact" style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", marginBottom: "30px" }}>Contact</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>Interested in a custom order? Reach out!</p>
        <p style={{ fontSize: "16px", color: "#555" }}>Email: your@email.com</p>
      </section>
    </div>
  );
}
