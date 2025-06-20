import CookieGrid from "../components/CookieGrid"; // <--- CAMBIO AQUÍ

import { useState } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import { SortOption } from "../types/product";

interface CatalogFilters {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
}

export default function Catalogo() {
  const [filters, setFilters] = useState<CatalogFilters>({
    searchTerm: "",
    minPrice: 0,
    maxPrice: 10000,
    sortBy: "newest",
  });

  return (
    <main className="relative bg-beigechew min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-10">
        <h1
          style={{ fontFamily: "Principal" }}
          className="text-center text-5xl font-bold text-amber-800 mb-4"
        >
          Catálogo de Galletas
        </h1>
        <p className="text-center text-lg text-gray-700 italic mb-6">
          Explora nuestra variedad de sabores irresistibles 🍪
        </p>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-4">
        {/* Filtro en la izquierda */}
        <div className="md:w-1/4">
          <Filter onSearch={setFilters} />
        </div>

        {/* Galletas en la derecha */}
        <div className="md:w-3/4">
          <section className="bg-[#f2e1c2] rounded-xl p-6 shadow-lg">
            <CookieGrid filters={filters} />
          </section>
        </div>
      </div>
      <Footer />

      <WhatsAppButton />
    </main>
  );
}
