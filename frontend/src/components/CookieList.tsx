// src/components/CookieList.tsx
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { db } from "../data/db";
import CookieItem from "./CookieItem";
import { useCart } from "./CartContext";

export default function CookieList() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scroll = (scrollOffset: number) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-8">MENU</h2>

      <div className="relative">
        {/* Flechas de navegación */}
        <button
          onClick={() => scroll(-300)}
          className="hidden md:block absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-redchew text-white p-3 rounded-full hover:bg-brownchew z-10"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Contenedor de productos */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide"
        >
          {db.map((product) => (
            <CookieItem key={product.id} product={product} />
          ))}
        </div>

        <button
          onClick={() => scroll(300)}
          className="hidden md:block absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-redchew text-white p-3 rounded-full hover:bg-brownchew z-10"
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </section>
  );
}
