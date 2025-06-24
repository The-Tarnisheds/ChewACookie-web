import { useEffect } from "react";
import CookieList from "../components/CookieList";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HomePage() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animación personalizada para textos interactivos
  const textHoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const textTapAnimation = {
    scale: 0.98,
    transition: { duration: 0.2 },
  };

  return (
    <main className="bg-amber-50 min-h-screen">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-8 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Imagen izquierda */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:block max-w-[400px]"
          >
            <img
              src="assets/cookieHand.png"
              alt="Mano con galleta"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Texto central */}
          <div className="w-full md:w-[40%] text-center md:text-left space-y-6">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl md:text-6xl font-bold leading-tight"
            >
              <span style={{ fontFamily: "Poppins" }} className="text-black">
                Elige tu{" "}
              </span>
              <br />
              <motion.span
                style={{ fontFamily: "Poppins" }}
                className="text-amber-800"
                animate={{
                  scale: [1, 1.03, 1],
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 8px rgba(146, 64, 14, 0.2)",
                    "0 0 0px rgba(0,0,0,0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                }}
              >
                Cookie Mood
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <motion.p
                style={{ fontFamily: "Poppins" }}
                className="font-sans text-xl md:text-2xl text-black italic font-medium cursor-default"
                whileHover={textHoverAnimation}
                whileTap={textTapAnimation}
              >
                Amor en cada mordida
              </motion.p>

              <motion.p
                style={{ fontFamily: "Poppins" }}
                className="font-sans text-lg md:text-xl text-black cursor-default"
                whileHover={textHoverAnimation}
                whileTap={textTapAnimation}
              >
                Hechas con ingredientes de calidad
              </motion.p>

              <motion.button
                style={{ fontFamily: "Poppins" }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(146, 64, 14, 0.3)",
                }}
                whileTap={{
                  scale: 0.97,
                  boxShadow: "0 5px 15px -5px rgba(146, 64, 14, 0.2)",
                }}
                className="bg-redchew text-white px-8 py-3 rounded-full font-sans font-medium shadow-lg transition-all"
              >
                Descubre nuestras galletas
              </motion.button>
            </motion.div>
          </div>

          {/* Imagen derecha */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[80%] md:w-[35%] max-w-[400px] mx-auto md:mx-0"
          >
            <motion.img
              src="assets/chewacookieHeader.png"
              alt="Galleta decorativa"
              className="w-full h-auto max-h-[60vh] object-contain"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </header>

      {/* Sección de menú */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <CookieList />
      </motion.section>

      {/* CTA Section */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-redchew text-white py-16 px-4 text-center"
      >
        <motion.h3
          style={{ fontFamily: "Poppins" }}
          className="text-3xl font-serif font-bold mb-4 cursor-default"
          whileHover={textHoverAnimation}
          whileTap={textTapAnimation}
        >
          ¿Listo para endulzar tu día?
        </motion.h3>

        <motion.p
          style={{ fontFamily: "Poppins" }}
          className="text-xl mb-8 max-w-2xl mx-auto cursor-default"
          whileHover={textHoverAnimation}
          whileTap={textTapAnimation}
        >
          Te invitamos a revisar nuestro catálogo!.
        </motion.p>

        <motion.button
          style={{ fontFamily: "Poppins" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)",
          }}
          whileTap={{
            scale: 0.97,
            boxShadow: "0 5px 15px -5px rgba(255, 255, 255, 0.2)",
          }}
          className="bg-white text-redchew px-8 py-3 rounded-full font-sans font-bold shadow-lg transition-all"
        >
          <a href="/catalogo">ir a catálogo</a>
        </motion.button>
      </motion.div>

      <WhatsAppButton />
      <Footer />
    </main>
  );
}
