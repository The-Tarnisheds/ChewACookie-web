import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SideBar from "../components/SideBar";
import axios from "axios";

export default function Crud() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState<any>(null);


  const closeModal = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(num);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/cookies/delete/${id}`);
      setProducts(
        products.filter((product: any) => product.id_producto !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [res1, res2] = await Promise.all([
        axios.get("http://localhost:3000/api/cookies"),
        axios.get("http://localhost:3000/api/cookies/categories"),
      ]);

      console.log("Productos cargados:", res1.data);
      console.log("Categorías cargadas:", res2.data);

      setProducts(res1.data.results || []);
      setCategories(res2.data.results || []);
    } catch (err) {
      console.error("Error al cargar datos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (product: { id_producto: any }) => {
    try {
      await axios.put(
        `http://localhost:3000/api/cookies/edit/${product.id_producto}`,
        product
      );
      await fetchData();
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  const handleCreate = async (newProduct: any) => {
  if (!newProduct) {
    console.error("No hay datos para crear el producto");
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:3000/api/cookies/create",
      newProduct
    );
    setProducts([...products, newProduct]);
    setIsCreateOpen(false);
    console.log("Producto creado exitosamente:", response.data);
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};

  return (
    <main className="relative flex max-w-full rounded-md text-center shadow-2xl">
  <SideBar />
  <div>
    <motion.div
      style={{ fontFamily: "Poppins" }}
      className="bg-lightbrownchew rounded-xl shadow-lg p-6 mx-4 mb-10 max-w-6xl max-h-screen overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
    >
      <h3 className="text-2xl font-bold text-redchew mb-6">Gestión de Productos</h3>
      <div className="flex justify-end mb-6">
        <button
          className="bg-redchew text-white rounded-md flex items-center px-4 py-2 hover:bg-brownchew transition-colors"
          onClick={() => {
            setNewProduct({
              nombre: "",
              descripcion: "",
              stock: 0,
              precio: 0,
              id_categoria: "",
              imagen: "assets/default.webp",
            });
            setIsCreateOpen(true);
          }}
        >
          <FaPlus className="mr-2" /> Agregar Producto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id_producto}
                className="bg-whitechew rounded-xl shadow-md p-4 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={product.imagen || "assets/default.jpg"}
                  alt={product.nombre}
                  className="h-32 w-32 rounded-lg object-cover mb-3"
                />
                <h3 className="text-brownchew font-semibold">{product.nombre}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.descripcion}</p>
                <p className="mt-1 text-sm">Stock: {product.stock}</p>
                <p className="mt-1 text-sm">Precio: {formatNumber(product.precio)}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-redchew text-white rounded-md p-2 hover:bg-brownchew transition-colors"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditOpen(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-redchew text-white rounded-md p-2 hover:bg-brownchew transition-colors"
                    onClick={() => handleDelete(product.id_producto)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p>No hay productos cargados...</p>
        )}
      </div>
    </motion.div>
  </div>

  {/* Modal Crear Producto */}
  <AnimatePresence>
    {isCreateOpen && (
      <motion.div
        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-whitechew rounded-2xl shadow-2xl p-6 w-full max-w-md overflow-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-redchew mb-4 text-center">Crear Producto</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate(newProduct);
              setIsCreateOpen(false);
            }}
            className="space-y-4"
          >
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={newProduct?.nombre || ""}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        nombre: e.target.value,
                      })
                    }
                    type="text"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={newProduct?.descripcion || ""}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        descripcion: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={newProduct?.stock || ""}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    type="number"
                    min={0}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={newProduct?.precio || ""}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        precio: Number(e.target.value),
                      })
                    }
                    type="number"
                    min={0}
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={newProduct?.id_categoria || ""}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        id_categoria: Number(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id_categoria} value={cat.id_categoria}>
                        {cat.descripcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen (URL)
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={newProduct?.imagen || "assets/default.webp"}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        imagen: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 transition-colors hover:bg-gray-400"
                    onClick={() => {
                      setIsCreateOpen(false);
                      setNewProduct(null);
                    }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-redchew text-white rounded-lg px-4 py-2 transition-colors hover:bg-brownchew"
                    
                  >
                    Guardar
                  </motion.button>
                </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-whitechew rounded-2xl shadow-2xl p-6 w-full max-w-md h-[90%] overflow-scroll border border-gray-200"
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <h3 className="text-xl font-bold text-redchew mb-4 text-center">
                Editar producto
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(selectedProduct);
                  setIsEditOpen(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={selectedProduct?.nombre || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        nombre: e.target.value,
                      })
                    }
                    type="text"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={selectedProduct?.descripcion || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        descripcion: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={selectedProduct?.stock || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    type="number"
                    min={0}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={selectedProduct?.precio || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        precio: Number(e.target.value),
                      })
                    }
                    type="number"
                    min={0}
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={selectedProduct?.categoria_id || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        categoria_id: Number(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id_categoria} value={cat.id_categoria}>
                        {cat.descripcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen (URL)
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-redchew transition"
                    value={selectedProduct?.imagen || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        imagen: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 transition-colors hover:bg-gray-400"
                    onClick={() => {
                      setIsEditOpen(false);
                      setSelectedProduct(null);
                    }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-redchew text-white rounded-lg px-4 py-2 transition-colors hover:bg-brownchew"
                  >
                    Guardar
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
