import { useRef, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CookieItem from "./CookieItem";
import { Product } from "../types/product";

export default function CookieList() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cookies")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.results);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);
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
      <h2 className="text-center text-5xl font-bold text-amber-800 mb-4">
        Nuestro Menú
      </h2>

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
          {productos.map((producto) => (
            <CookieItem key={producto.id_producto} product={producto} />
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
