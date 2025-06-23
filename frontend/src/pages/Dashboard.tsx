import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function Dashboard() {
  type SalesData = { data: number };
  type ProductData = any; 

  type SalesSummary = {
  message: string;
  success: boolean;
  data: {
    monthlySales: any;  
    weeklySales: any;
    yesterdaySales: number;
    todaySales: number;
  };
};

  const [mostSoldProducts, setMostSoldProducts] = useState<ProductData | null>(
    null
  );
    const navigate = useNavigate();

  const [leastSoldProducts, setLeastSoldProducts] =
    useState<ProductData | null>(null);
  const [totalSales, setTotalVentas] = useState<SalesData | null>(null);
  const [totalOrders, setTotalOrders] = useState<SalesData | null>(null);
  const [detailSales, setDetailSales] = useState<SalesSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const formatNumber = (num: number) => {
    if (num == null || isNaN(num)) return '0';

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(num);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3, res4, res5] = await Promise.all([
          axios.get("http://localhost:3000/api/dashboard/most-solds"),
          axios.get("http://localhost:3000/api/dashboard/least-solds"),
          axios.get("http://localhost:3000/api/dashboard/total-sales"),
          axios.get("http://localhost:3000/api/dashboard/total-orders"),
          axios.get("http://localhost:3000/api/dashboard/details-sales"),
        ]);

        setMostSoldProducts(res1.data);
        setLeastSoldProducts(res2.data);
        setTotalVentas(res3.data);
        setTotalOrders(res4.data);
        setDetailSales(res5.data);
      } catch (err) {
        console.error("Error al cargar datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log("Datos de productos más vendidos:", mostSoldProducts);
    console.log("Datos de productos menos vendidos:", leastSoldProducts);
    console.log("Datos de total de ventas:", totalSales);
  }, []);

  return (
    <main className="relative flex flex-col-2 bg-pinkchew min-h-screen rounded-md text-center shadow-2xl ">
      <div className="bg-whitechew w-1/5 shadow-xl">
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
              <img
                src="assets/Logo.png"
                alt="Logo"
                className="w-60 md:w-72 object-contain p-5"
              />
          </motion.div>

          <p className="border-1"
          onClick={() => {
            navigate("/admin-crud")}}
          > Gestion de productos</p>
      </div>
      <div className="w-4/5">

      <h1
        style={{ fontFamily: "Poppins" }}
        className="text-5xl font-bold text-[#af040d]  p-5"
      >
        Dashboard de Ventas
      </h1>
      <div className="flex flex-row items-center justify-center py-10 gap-x-6 w-3/3 p-5">
        <motion.div
          style={{ fontFamily: "Poppins" }}
          className="bg-whitechew rounded-xl shadow-lg p-6 flex flex-col w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{ fontFamily: "Poppins" }}
            className="text-xl font-bold text-[#592d17] mb-4"
          >
            Total ventas
          </h3>
          <div className="text-center py-4 flex-grow flex flex-col justify-center">
            <motion.div
              className="text-5xl font-bold text-[#af040d] mb-2"
              whileHover={{ scale: 1.1 }}
            >
              {totalSales
                ? formatNumber(totalSales.data) + " CLP"
                : "Cargando..."}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          style={{ fontFamily: "Poppins" }}
          className="bg-whitechew rounded-xl shadow-lg p-6 flex flex-col w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{ fontFamily: "Poppins" }}
            className="text-xl font-bold text-[#592d17] mb-4"
          >
            Total de pedidos
          </h3>
          <div className="text-center py-4 flex-grow flex flex-col justify-center">
            <motion.div
              className="text-5xl font-bold text-[#af040d] mb-2"
              whileHover={{ scale: 1.1 }}
            >
              {totalOrders ? formatNumber(totalOrders.data) : "Cargando..."}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          style={{ fontFamily: "Poppins" }}
          className="bg-whitechew rounded-xl shadow-lg p-6 flex flex-col w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{ fontFamily: "Poppins" }}
            className="text-xl font-bold text-[#592d17] mb-4"
          >
            Producto menos vendido
          </h3>
          <div className="text-center py-4 flex-grow flex flex-col justify-center">
            <motion.div
              className="text-5xl font-bold text-[#af040d] mb-2"
              whileHover={{ scale: 1.1 }}
            >
              0
            </motion.div>
          </div>
        </motion.div>
      </div>
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
            Productos más vendidos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {mostSoldProducts ? (
              mostSoldProducts.data.map((product: any) => (
                <motion.div
                  key={product.product.id_producto}
                  className="bg-whitechew rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold text-[#592d17]">
                    {product.product.nombre}
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-[#af040d] "
                    whileHover={{ scale: 1.1 }}
                  >
                    {product.total_vendido}
                  </motion.div>
                  <p className="text-xl font-bold text-[#af040d]">unidades</p>
                </motion.div>
              ))
            ) : (
              <p>Cargando productos más vendidos...</p>
            )}
          </div>
        </motion.div>
      </div>
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
            Ventas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <motion.div
                  className="bg-whitechew rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold text-[#592d17]">
                    Mes
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-[#af040d] "
                    whileHover={{ scale: 1.1 }}
                  >
                    {detailSales
                        ? formatNumber(detailSales.data.monthlySales)
                        : "Cargando..."
                    }
                  </motion.div>
                  <p className="text-xl font-bold text-[#af040d]">CLP</p>
                </motion.div>
            <motion.div
                  className="bg-whitechew rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold text-[#592d17]">
                    Semanal
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-[#af040d] "
                    whileHover={{ scale: 1.1 }}
                  >
                    {detailSales
                        ? formatNumber(detailSales.data.weeklySales)
                        : "Cargando..."
                    }
                  </motion.div>
                  <p className="text-xl font-bold text-[#af040d]">CLP</p>
                </motion.div>
            <motion.div
                  className="bg-whitechew rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold text-[#592d17]">
                    Ayer
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-[#af040d] "
                    whileHover={{ scale: 1.1 }}
                  >
                    {detailSales
                        ? formatNumber(detailSales.data.yesterdaySales)
                        : "Cargando..."
                    }
                  </motion.div>
                  <p className="text-xl font-bold text-[#af040d]">CLP</p>
                </motion.div>
            <motion.div
                  className="bg-whitechew rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold text-[#592d17]">
                    Día
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-[#af040d] "
                    whileHover={{ scale: 1.1 }}
                  >
                    {detailSales
                        ? formatNumber(detailSales.data.todaySales)
                        : "Cargando..."
                    }
                  </motion.div>
                  <p className="text-xl font-bold text-[#af040d]">CLP</p>
                </motion.div>
          </div>
        </motion.div>
      </div>
      </div>
    </main>
  );
}
