import { Product } from "../types/product";
import { useCart } from "./CartContext";

interface Props {
  product: Product;
}

export default function CookieItem({ product }: Props) {
  const { addToCart } = useCart(); // Obtiene la función del context

  return (
    <div className="flex-shrink-0 w-[300px] bg-white rounded-xl shadow-md p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-2xl font-bold text-center mb-2">{product.name}</h3>
      <p className="text-xl font-bold text-center text-amber-800 mb-4">
        ${product.price.toLocaleString()}
      </p>
      <button
        onClick={() => addToCart(product)} // Función del Context
        className="w-full bg-redchew text-white py-2 rounded-xl hover:bg-brownchew transition-colors"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
