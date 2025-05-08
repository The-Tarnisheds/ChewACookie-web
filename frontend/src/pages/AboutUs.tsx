import { useState } from "react";
import CartAside from "../components/CartAside";
//import { useCart } from "../components/CartContext";
import { motion } from "framer-motion";

export default function AboutUs() {
  //const { cartItemsCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="bg-beige min-h-screen">
      <section className="container mx-auto px-4 py-10 space-y-10">
        {/* Imagen ilustrativa centrada */}
        <motion.div
          className="w-full flex justify-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/assets/Logo.png"
            alt="Ilustración relacionada"
            className="rounded-xl w-full max-w-2xl h-auto object-contain"
          />
        </motion.div>

        {/* SOBRE NOSOTROS */}
        <motion.div
          className="bg-[#f5e4cc] shadow-lg rounded-xl p-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-800 mb-4 text-center md:text-left">
            Sobre Nosotros
          </h1>
          <p className="text-black text-lg md:text-xl font-sans mb-4">
            En <strong>Cookie Mood</strong> creemos que cada galleta debe contar
            una historia...
          </p>
          <p className="text-black text-lg md:text-xl font-sans">
            Usamos solo ingredientes seleccionados de alta calidad...
          </p>
        </motion.div>

        {/* MISIÓN */}
        <motion.div
          className="bg-[#f5e4cc] shadow-lg rounded-xl p-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-800 mb-4 text-center md:text-left">
            Misión
          </h2>
          <p className="text-black text-lg md:text-xl font-sans">
            Nuestra misión es simple: llevar dulzura a tu vida...
          </p>
        </motion.div>

        {/* VISIÓN */}
        <motion.div
          className="bg-[#f5e4cc] shadow-lg rounded-xl p-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-800 mb-4 text-center md:text-left">
            Visión
          </h2>
          <p className="text-black text-lg md:text-xl font-sans">
            Ser reconocidos como la marca de galletas artesanales más querida...
          </p>
        </motion.div>
      </section>

      {/* CartAside */}
      <CartAside isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
