import CookieGrid from "../components/CookieGrid"; // <--- CAMBIO AQUÍ
import CartAside from "../components/CartAside";
import { useState } from "react";

export default function Catalogo() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="relative bg-beigechew min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-10">
        <h1 className="text-center text-5xl font-bold text-amber-800 mb-4">
          Catálogo de Galletas
        </h1>
        <p className="text-center text-lg text-gray-700 italic mb-6">
          Explora nuestra variedad de sabores irresistibles 🍪
        </p>
      </header>

      {/* Contenedor estilo ecommerce */}
      <section className="bg-[#f2e1c2] max-w-5xl mx-auto rounded-xl p-6 shadow-lg">
        <CookieGrid />
      </section>

      <CartAside isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
