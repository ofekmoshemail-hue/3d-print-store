import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Print Studio",
  description: "Custom 3D printed items made with care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif", backgroundColor: "#fafafa", minHeight: "100vh" }}>
        <CartProvider>
          <Header />
          {children}
          <footer style={{
            backgroundColor: "#1a1a2e",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            padding: "30px",
            marginTop: "60px",
            fontSize: "14px",
          }}>
            <p>My 3D Print Shop - 2026</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
