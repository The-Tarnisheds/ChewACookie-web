import { useCart } from "./CartContext";
import { Product } from "../types/product";

interface Props {
  product: Product;
}
export default function Producto({ product }: Props) {
  const { addToCart } = useCart(); // Obtiene la función del context

  return (
    <div className="flex-shrink-0 w-[300px] bg-white rounded-xl shadow-md p-6">
      <img
        src={product.imagen}
        alt={product.nombre}
        className="w-full h-48 mb-4 object-contain shadow-md rounded-lg"
      />
      <h3
        style={{ fontFamily: "Poppins" }}
        className="text-xl font-bold text-center mb-2"
      >
        {product.nombre}
      </h3>
      <p className="text-xl font-bold text-center text-amber-800 mb-4">
        ${product.precio.toLocaleString()}
      </p>
      <button
        style={{ fontFamily: "Poppins" }}
        onClick={() => addToCart(product)} // Función del Context
        className="w-full bg-redchew text-white py-2 rounded-xl hover:bg-brownchew transition-colors"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
