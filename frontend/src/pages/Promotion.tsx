import { motion } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import ChewPoints from "../../assets/chewpoints.png";

export default function Promotions() {
  // Productos canjeables
  const redeemableProducts = [
    {
      points: 30,
      title: "1 Cookie a elección",
      description: "Elige tu galleta favorita",
      color: "bg-[#e2c89f]",
    },
    {
      points: 40,
      title: "3 Cookies + Salsas",
      description: "Variedad de sabores con dips especiales",
      color: "bg-[#f4e9d7]",
    },
    {
      points: 90,
      title: "1 CookieBox",
      description: "Nuestra selección premium",
      color: "bg-[#592d17] text-white",
    },
  ];

  return (
    <main className="relative bg-[#faf7ee] min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-12">
        <motion.h1
          style={{ fontFamily: "Poppins" }}
          className="text-center text-5xl font-bold text-[#592d17] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Chew Points
        </motion.h1>
        <motion.p
          style={{ fontFamily: "Poppins" }}
          className="text-center text-lg text-[#af040d] italic mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ¡Canjea productos gratis con tus puntos acumulados! 🍪✨
        </motion.p>
      </header>

      {/* Banner 1: Todo sobre Chew Points */}
      <motion.section
        style={{ fontFamily: "Poppins" }}
        className="max-w-6xl mx-auto mb-16 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-[#f4e9d7] to-[#e2c89f] rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <motion.div
            className="md:w-1/2 p-8 flex flex-col justify-center"
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            <h2
              style={{ fontFamily: "Poppins" }}
              className="text-4xl font-bold text-[#592d17] mb-4"
            >
              ¡Canjea productos GRATIS!
            </h2>
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-lg text-[#592d17] mb-6"
            >
              Con Chew Points, cada compra te acerca a deliciosas recompensas.
              Acumula puntos y redímelos por productos exclusivos.
            </p>
            <motion.button
              style={{ fontFamily: "Poppins" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#af040d] text-white px-6 py-3 rounded-full font-bold self-start"
            >
              Ver mis puntos
            </motion.button>
          </motion.div>
          <div className="md:w-1/2 bg-gray-200 flex items-center justify-center">
            <motion.div
              className="w-full h-64 md:h-full flex items-center justify-center bg-[#ffdede]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="text-[#592d17]">
                <img src={ChewPoints} alt="" />
              </span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Banner 2: Cómo acumular puntos */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#f4e9d7] rounded-2xl shadow-lg p-8">
          <motion.h2
            style={{ fontFamily: "Poppins" }}
            className="text-3xl font-bold text-[#592d17] mb-6 text-center"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            ¿Cómo acumular ChewPoints?
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              style={{ fontFamily: "Poppins" }}
              className="bg-white p-6 rounded-xl shadow-md flex-1 text-center"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl text-[#af040d] mb-4">10</div>
              <h3
                style={{ fontFamily: "Poppins" }}
                className="text-xl font-bold text-[#592d17] mb-2"
              >
                ChewPoints
              </h3>
              <p style={{ fontFamily: "Poppins" }} className="text-[#592d17]">
                por cada compra superior a $10.000 en nuestra tienda online
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md flex-1 text-center"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-6xl text-[#af040d] mb-4">5</div>
              <h3
                style={{ fontFamily: "Poppins" }}
                className="text-xl font-bold text-[#592d17] mb-2"
              >
                ChewPoints
              </h3>
              <p style={{ fontFamily: "Poppins" }} className="text-[#592d17]">
                por cada reseña con foto de tu compra
              </p>
            </motion.div>

            <motion.div
              style={{ fontFamily: "Poppins" }}
              className="bg-white p-6 rounded-xl shadow-md flex-1 text-center"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl text-[#af040d] mb-4">2</div>
              <h3
                style={{ fontFamily: "Poppins" }}
                className="text-xl font-bold text-[#592d17] mb-2"
              >
                ChewPoints
              </h3>
              <p style={{ fontFamily: "Poppins" }} className="text-[#592d17]">
                por cada cumpleaños en nuestro sistema
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Banner 3: Cómo canjear puntos */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#e2c89f] rounded-2xl shadow-lg p-8">
          <motion.h2
            style={{ fontFamily: "Poppins" }}
            className="text-3xl font-bold text-[#592d17] mb-8 text-center"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            ¿Cómo canjear ChewPoints?
          </motion.h2>

          <motion.div
            style={{ fontFamily: "Poppins" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Arma tu carrito",
                description: "Incluye productos canjeables con puntos",
              },
              {
                step: "2",
                title: "Selecciona 'Usar puntos'",
                description: "Al pagar, elige cuántos puntos aplicar",
              },
              {
                step: "3",
                title: "Disfruta tu recompensa",
                description: "Recibe tu pedido con productos gratis",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-[#af040d] mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#592d17] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#592d17]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Banner 4: Productos canjeables */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <motion.h2
            style={{ fontFamily: "Poppins" }}
            className="text-3xl font-bold text-[#592d17] mb-6 text-center py-6 bg-[#ffdede]"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            ¡Elige 1 de estos productos GRATIS!
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 divide-x divide-[#f4e9d7]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {redeemableProducts.map((product, index) => (
              <motion.div
                key={index}
                className={`${product.color} p-8 text-center flex flex-col items-center`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  style={{ fontFamily: "Poppins" }}
                  className="text-4xl font-bold mb-2"
                >
                  {product.points} CP
                </div>
                <h3
                  style={{ fontFamily: "Poppins" }}
                  className="text-2xl font-bold mb-4"
                >
                  {product.title}
                </h3>
                <p style={{ fontFamily: "Poppins" }} className="mb-6">
                  {product.description}
                </p>
                <motion.button
                  style={{ fontFamily: "Poppins" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#af040d] text-white px-6 py-2 rounded-full font-bold"
                >
                  Canjear ahora
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Footer />

      <WhatsAppButton />
    </main>
  );
}
