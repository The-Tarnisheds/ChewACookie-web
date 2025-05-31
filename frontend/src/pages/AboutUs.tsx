import { useState } from "react";
import { motion } from "framer-motion";
import { BookHeart, Target, Eye } from "lucide-react";
import CartAside from "../components/CartAside";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function AboutUs() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fadeInStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const Section = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <motion.div
      className="relative bg-gradient-to-br from-[#f5e4cc] to-[#f9f0e6] shadow-xl rounded-2xl p-8 overflow-hidden hover:scale-[1.01] transition-transform duration-300"
      variants={fadeInUp}
    >
      {/* Icono decorativo */}
      <div className="absolute -top-5 -left-5 opacity-20 text-amber-800">
        {icon}
      </div>

      <h2 className="flex items-center text-3xl md:text-4xl font-serif font-bold text-amber-800 mb-4 z-10 relative">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>

      <div className="text-black text-lg md:text-xl font-sans space-y-4 relative z-10">
        {children}
      </div>
    </motion.div>
  );

  return (
    <main className="bg-beige min-h-screen flex flex-col">
      <section className="container mx-auto px-4 py-12 flex-1 space-y-12">
        <motion.div
          className="flex justify-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/assets/Logo.png"
            alt="Logo Chew A Cookie"
            className="rounded-2xl w-full max-w-2xl h-auto object-contain drop-shadow-md"
          />
        </motion.div>

        {/* Secciones con animación escalonada */}
        <motion.div
          variants={fadeInStagger}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <Section title="Sobre Nosotros" icon={<BookHeart size={36} />}>
            <p>
              En <strong>Chew A Cookie</strong> creemos que cada galleta debe
              contar una historia...
            </p>
            <p>Usamos solo ingredientes seleccionados de alta calidad...</p>
          </Section>

          <Section title="Misión" icon={<Target size={36} />}>
            <p>Nuestra misión es simple: llevar dulzura a tu vida...</p>
          </Section>

          <Section title="Visión" icon={<Eye size={36} />}>
            <p>
              Ser reconocidos como la marca de galletas artesanales más
              querida...
            </p>
          </Section>
        </motion.div>
      </section>

      {/* Componentes persistentes */}
      <CartAside isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
