import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import axios from "axios";

export default function Crud() {
    const [products, setProducts] = useState([]);
    
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(num);
}
    

 useEffect(() => {
    fetch("http://localhost:3000/api/cookies")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <main className="relative bg-pinkchew min-h-screen rounded-md text-center shadow-2xl">
     
      <div>
        <motion.div
          style={{ fontFamily: "Poppins" }}
          className="bg-white rounded-xl shadow-lg p-6 mx-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        >
          <h3
            style={{ fontFamily: "Poppins" }}
            className="text-xl font-bold text-[#592d17] mb-4"
          >
            Gestión de Productos
          </h3>
          <div className="text-center">
            {products.length > 0 ? (
                products.map((product: any) => (
                <div
                    key={product.id_producto}  
                    className="flex flex-row bg-whitechew rounded-lg shadow-lg items-center gap-4 mb-6 p-2"
                >
                    <img
                    src={product.imagen || "assets/default.jpg"}
                    alt={product.nombre}
                    className="h-16 w-16 rounded-lg"
                    />
                    <h3 className="min-w-[200px]">{product.nombre}</h3>
                    <h3 className="max-w-lg overflow-hidden text-ellipsis break-words line-clamp-3 text-start">
                        Descripción: {product.descripcion}
                        </h3>
                    <h3>Stock: {product.stock}</h3>
                    <h3>Precio: {formatNumber(product.precio)} CLP</h3>
                    <button
                    style={{ fontFamily: "Poppins" }}
                    className="w-10 h-10 bg-redchew text-white rounded-md hover:bg-brownchew transition-colors flex items-center justify-center"
                    >
                    <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                    style={{ fontFamily: "Poppins" }}
                    className="w-10 h-10 bg-redchew text-white rounded-md hover:bg-brownchew transition-colors flex items-center justify-center"
                    >
                    <FaTrash className="w-5 h-5" />
                    </button>
                </div>
                ))
            ) : (
                <p>No hay productos cargados...</p>
            )}
            </div>
        </motion.div>
      </div>
     
    </main>
  );
}
