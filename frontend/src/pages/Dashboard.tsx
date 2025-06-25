import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    if (num == null || isNaN(num)) return "0";

    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(num);
  };

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
    <main className="relative flex min-h-screen bg-beige">
      {/* Sidebar */}
      <motion.div
        className="w-64 bg-brownchew shadow-xl"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="assets/Logo.png"
            alt="Logo"
            className="w-48 mx-auto py-6 object-contain filter brightness-0 invert"
          />
        </motion.div>

        <motion.button
          onClick={() => navigate("/admin-crud")}
          className="w-full py-3 px-6 text-whitechew text-left hover:bg-lightbrownchew transition-colors flex items-center"
          whileHover={{ x: 5 }}
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Gestión de productos
        </motion.button>
      </motion.div>

      {/* Contenido principal */}
      <div className=" flex-1 p-8">
        <motion.h2
          style={{ fontFamily: "Poppins" }}
          className="text-4xl font-serif font-bold text-center mb-12 text-redchew cursor-default"
          whileHover={{
            scale: 1.03,
            textShadow: "0 5px 15px rgba(146, 64, 14, 0.2)",
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            hover: { duration: 0.3 },
            tap: { duration: 0.2 },
          }}
        >
          Dashboard de ventas
        </motion.h2>

        {/* Tarjetas superiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta Total Ventas */}
          <motion.div
            className="bg-whitechew rounded-xl shadow-lg p-6 border-l-4 border-redchew"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(89, 45, 23, 0.2)",
            }}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-redchew/10 mr-3">
                <svg
                  className="w-6 h-6 text-redchew"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brownchew">
                Total Ventas
              </h3>
            </div>
            <div className="text-3xl font-bold text-redchew py-2">
              {totalSales ? formatNumber(totalSales.data) : "Cargando..."}
            </div>
          </motion.div>

          {/* Tarjeta Total Pedidos */}
          <motion.div
            className="bg-whitechew rounded-xl shadow-lg p-6 border-l-4 border-redchew"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(89, 45, 23, 0.2)",
            }}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-redchew/10 mr-3">
                <svg
                  className="w-6 h-6 text-redchew"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brownchew">
                Total Pedidos
              </h3>
            </div>
            <div className="text-3xl font-bold text-redchew py-2">
              {totalOrders ? totalOrders.data : "Cargando..."}
            </div>
          </motion.div>

          {/* Tarjeta Producto Menos Vendido */}
          <motion.div
            className="bg-whitechew rounded-xl shadow-lg p-6 border-l-4 border-redchew"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(89, 45, 23, 0.2)",
            }}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-redchew/10 mr-3">
                <svg
                  className="w-6 h-6 text-redchew"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brownchew">
                Producto Menos Vendido
              </h3>
            </div>
            <div className="text-3xl font-bold text-redchew py-2">0</div>
          </motion.div>
        </div>

        {/* Sección Productos Más Vendidos */}
        <motion.div
          className="bg-whitechew rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold text-brownchew flex items-center">
              <svg
                className="w-5 h-5 text-redchew mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Productos Más Vendidos
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mostSoldProducts ? (
              mostSoldProducts.data.map((product: any) => (
                <motion.div
                  key={product.product.id_producto}
                  className="bg-white rounded-lg shadow p-4 border-b-4 border-redchew hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <h4 className="text-lg font-semibold text-brownchew mb-2">
                    {product.product.nombre}
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-brownchew/70">
                      Unidades vendidas:
                    </span>
                    <span className="text-xl font-bold text-redchew">
                      {product.total_vendido}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-brownchew">
                Cargando productos más vendidos...
              </p>
            )}
          </div>
        </motion.div>

        {/* Sección Resumen de Ventas */}
        <motion.div
          className="bg-whitechew rounded-xl shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold text-brownchew flex items-center">
              <svg
                className="w-5 h-5 text-redchew mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Resumen de Ventas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tarjeta Ventas Mensuales */}
            <motion.div
              className="bg-white rounded-lg shadow p-4 border-b-4 border-redchew"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-lg font-semibold text-brownchew mb-2">
                Este Mes
              </h4>
              <div className="text-xl font-bold text-redchew">
                {detailSales
                  ? formatNumber(detailSales.data.monthlySales)
                  : "Cargando..."}
              </div>
            </motion.div>

            {/* Tarjeta Ventas Semanales */}
            <motion.div
              className="bg-white rounded-lg shadow p-4 border-b-4 border-redchew"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-lg font-semibold text-brownchew mb-2">
                Esta Semana
              </h4>
              <div className="text-xl font-bold text-redchew">
                {detailSales
                  ? formatNumber(detailSales.data.weeklySales)
                  : "Cargando..."}
              </div>
            </motion.div>

            {/* Tarjeta Ventas de Ayer */}
            <motion.div
              className="bg-white rounded-lg shadow p-4 border-b-4 border-redchew"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-lg font-semibold text-brownchew mb-2">
                Ayer
              </h4>
              <div className="text-xl font-bold text-redchew">
                {detailSales
                  ? formatNumber(detailSales.data.yesterdaySales)
                  : "Cargando..."}
              </div>
            </motion.div>

            {/* Tarjeta Ventas Hoy */}
            <motion.div
              className="bg-white rounded-lg shadow p-4 border-b-4 border-redchew"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-lg font-semibold text-brownchew mb-2">Hoy</h4>
              <div className="text-xl font-bold text-redchew">
                {detailSales
                  ? formatNumber(detailSales.data.todaySales)
                  : "Cargando..."}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
