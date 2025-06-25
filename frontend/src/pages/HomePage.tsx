import { useEffect, useState } from "react";
import CookieList from "../components/CookieList";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HomePage() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "assets/banner.jpg",
    "assets/banner2.jpg",
    "assets/banner3.jpg",
    "assets/banner4.jpg",
    "assets/banner5.jpg",
    "assets/banner6.jpg",
  ];

  // Auto-avance del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

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
    <main className="bg-amber-50 min-h-screen rounded-4xl">
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

      {/* Carrusel */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gradient-to-b from-amber-50 to-amber-100"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            style={{ fontFamily: "Poppins" }}
            className="text-4xl font-serif font-bold text-center mb-12 text-amber-800"
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
            Nuestras Creaciones
          </motion.h2>

          <div className="relative w-auto h-[500px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
            {/* Slides */}
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  zIndex: index === currentSlide ? 10 : 0,
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <img
                  src={img}
                  alt={`Galería de productos ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            {/* Controles */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-redchew w-6" : "bg-whitechew"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Flechas de navegación */}
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + images.length) % images.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
              aria-label="Slide anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % images.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
              aria-label="Siguiente slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.section>

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
