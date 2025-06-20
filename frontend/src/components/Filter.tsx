import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from "react-icons/fa";
export type SortOption = "price-asc" | "price-desc" | "newest";

export interface FilterProps {
  onSearch: (filters: {
    searchTerm: string;
    minPrice: number;
    maxPrice: number;
    sortBy: SortOption;
  }) => void;
}

export default function Filter({ onSearch }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleApplyFilters = () => {
    onSearch({
      searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange([0, 10000]);
    setSortBy("newest");
    onSearch({
      searchTerm: "",
      minPrice: 0,
      maxPrice: 10000,
      sortBy: "newest",
    });
  };

  return (
    <motion.div
      className="bg-[#ffffff] p-6 rounded-xl shadow-lg mb-6 border border-[#e2c89f]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h2
          className="text-xl font-bold text-[#592d17] flex items-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span animate={{ rotate: 0 }} whileHover={{ rotate: 15 }}>
            <FaFilter className="mr-2" />
          </motion.span>
          <span style={{ fontFamily: "Poppins" }}>Filtrar Galletas</span>
        </motion.h2>

        <motion.button
          onClick={handleReset}
          className="text-sm text-[#af040d] flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTimes className="mr-1" /> Limpiar
        </motion.button>
      </div>

      {/* Buscador por nombre */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <label
          className="block text-sm font-medium text-[#592d17] mb-2"
          style={{ fontFamily: "Poppins" }}
        >
          Buscar por nombre
        </label>
        <motion.div className="relative" whileHover={{ scale: 1.01 }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: Cookie de chocolate"
            className="w-full px-4 py-2 pl-10 rounded-lg border border-[#e2c89f] focus:outline-none focus:ring-2 focus:ring-[#592d17] text-[#592d17]"
            style={{ fontFamily: "Poppins" }}
          />
          <motion.div
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute left-3 top-3 text-[#592d17]"
          >
            <FaSearch />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rango de precios */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label
          className="block text-sm font-medium text-[#592d17] mb-2"
          style={{ fontFamily: "Poppins" }}
        >
          Rango de precios: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full h-2 bg-[#e2c89f] rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-[#e2c89f] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </motion.div>

      {/* Ordenar por */}
      <motion.div
        className="mb-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label
          className="block text-sm font-medium text-[#592d17] mb-2"
          style={{ fontFamily: "Poppins" }}
        >
          Ordenar por
        </label>
        <motion.button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="w-full px-4 py-2 text-left bg-white rounded-lg border border-[#e2c89f] flex justify-between items-center"
          whileHover={{ backgroundColor: "#ffdede" }}
          whileTap={{ scale: 0.98 }}
        >
          <span style={{ fontFamily: "Poppins" }}>
            {sortBy === "price-asc" && "Precio: Menor a mayor"}
            {sortBy === "price-desc" && "Precio: Mayor a menor"}
            {sortBy === "newest" && "Más recientes"}
          </span>
          <motion.span animate={{ rotate: isSortOpen ? 180 : 0 }}>
            <FaArrowDown />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isSortOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-[#e2c89f] overflow-hidden"
            >
              {[
                {
                  value: "newest",
                  label: "Más recientes",
                  icon: <FaCalendarAlt className="mr-2" />,
                },
                {
                  value: "price-asc",
                  label: "Precio: Menor a mayor",
                  icon: <FaArrowUp className="mr-2" />,
                },
                {
                  value: "price-desc",
                  label: "Precio: Mayor a menor",
                  icon: <FaArrowDown className="mr-2" />,
                },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value as any);
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center ${
                    sortBy === option.value
                      ? "bg-[#ffdede]"
                      : "hover:bg-[#f4e9d7]"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  {option.icon}
                  <span style={{ fontFamily: "Poppins" }}>{option.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Botón aplicar */}
      <motion.button
        onClick={handleApplyFilters}
        className="w-full bg-[#af040d] text-white py-2 rounded-lg font-bold"
        style={{ fontFamily: "Poppins" }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "#8a030a",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        Aplicar
      </motion.button>
    </motion.div>
  );
}
