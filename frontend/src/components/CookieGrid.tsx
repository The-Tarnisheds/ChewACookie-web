import { useEffect, useState } from "react";
import CookieItem from "./CookieItem";
import { Product, SortOption } from "../types/product";

interface CookieGridProps {
  filters: {
    searchTerm: string;
    minPrice: number;
    maxPrice: number;
    sortBy: SortOption;
  };
}

export default function CookieGrid({ filters }: CookieGridProps) {
  const [productos, setProductos] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cookies")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.results);
        setFilteredProducts(data.results); // Inicialmente mostrar todos
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  useEffect(() => {
    // Aplicar filtros cada vez que cambien
    let result = [...productos];

    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      result = result.filter((product) =>
        product.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de precio
    result = result.filter(
      (product) =>
        product.precio >= filters.minPrice && product.precio <= filters.maxPrice
    );

    // Ordenar
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.precio - b.precio;
        case "price-desc":
          return b.precio - a.precio;
        case "newest":
        default:
          // Asumiendo que los más nuevos tienen IDs más altos
          return b.id_producto - a.id_producto;
      }
    });

    setFilteredProducts(result);
  }, [filters, productos]);

  return (
    <div className="space-y-6">
      {/* Mostrar cantidad de resultados */}
      <p className="text-[#592d17] font-medium">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "producto" : "productos"} encontrados
      </p>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <CookieItem key={producto.id_producto} product={producto} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-[#592d17]">
              No se encontraron productos que coincidan con los filtros
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
