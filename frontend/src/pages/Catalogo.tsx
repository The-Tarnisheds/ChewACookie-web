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
          className="text-center text-5xl font-bold text-amber-800 "
        >
          Catálogo de Galletas
        </h1>
        <p className="text-center text-lg text-gray-700 italic ">
          Explora nuestra variedad de sabores irresistibles 🍪
        </p>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row  gap-6  ">
        {/* Filtro en la izquierda */}
        <div className="md:w-1/4 lg:w-1/4 mt-12">
          <Filter onSearch={setFilters} />
        </div>

        {/* Galletas en la derecha */}
        <div className="md:w-3/4 lg:w-3/4 max-w-3xl">
          <CookieGrid filters={filters} />
        </div>
      </div>
      <Footer />

      <WhatsAppButton />
    </main>
  );
}
