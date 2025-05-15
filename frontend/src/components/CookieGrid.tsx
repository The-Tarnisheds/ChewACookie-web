import { useEffect, useState } from "react";
import CookieItem from "./CookieItem";
import { Product } from "../types/product";

export default function CookieGrid() {
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cookies")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.results);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {productos.map((producto) => (
        <CookieItem key={producto.id_producto} product={producto} />
      ))}
    </div>
  );
}
