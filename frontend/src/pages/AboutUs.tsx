import { motion } from "framer-motion";
import {
  BookHeart,
  Target,
  Eye,
  Gift,
  Cake,
  Cookie,
  Package,
  User,
} from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function AboutUs() {
  const fadeInStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
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
      className="relative bg-gradient-to-br from-[#f5e4cc] to-[#f9f0e6] shadow-xl rounded-2xl p-8 overflow-hidden hover:shadow-amber-800/20 transition-all duration-300 group"
      variants={fadeInUp}
      whileHover={{ y: -5 }}
    >
      <div className="absolute -top-5 -left-5 opacity-20 text-amber-800 group-hover:opacity-30 transition-opacity duration-300">
        {icon}
      </div>

      <motion.h2
        className="flex items-center text-3xl md:text-4xl font-serif font-bold text-amber-800 mb-4 z-10 relative"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.span className="inline-block" whileHover={{ rotate: 10 }}>
          {icon}
        </motion.span>
        <span className="ml-3">{title}</span>
      </motion.h2>

      <div className="text-black text-lg md:text-xl font-sans space-y-4 relative z-10">
        {children}
      </div>
    </motion.div>
  );

  const ServiceItem = ({
    icon,
    children,
  }: {
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <motion.li
      className="flex items-start space-x-3 py-2"
      variants={fadeInUp}
      whileHover={{ x: 5 }}
    >
      <motion.span className="text-amber-800 mt-1" whileHover={{ scale: 1.2 }}>
        {icon}
      </motion.span>
      <span>{children}</span>
    </motion.li>
  );

  return (
    <main className="bg-whitechew rounded-2xl min-h-screen flex flex-col">
      <section className="container mx-auto px-4 py-12 flex-1 space-y-16">
        {/* Logo con animación */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.img
            src="/assets/Logo.png"
            alt="Logo Chew A Cookie"
            className="rounded-2xl w-full max-w-2xl h-auto object-contain drop-shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        {/* Secciones principales */}
        <motion.div
          variants={fadeInStagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Sección Sobre Nosotros */}
            <Section title="Sobre Nosotros" icon={<BookHeart size={36} />}>
              <p>
                En <strong className="text-amber-800">Chew A Cookie</strong>{" "}
                creemos que cada galleta debe contar una historia...
              </p>
              <p>Usamos solo ingredientes seleccionados de alta calidad...</p>
            </Section>

            {/* Sección Misión */}
            <Section title="Misión" icon={<Target size={36} />}>
              <p>
                Endulzar momentos con productos artesanales únicos, elaborados
                con ingredientes de calidad y amor en cada detalle.
              </p>
            </Section>

            {/* Sección Visión */}
            <Section title="Visión" icon={<Eye size={36} />}>
              <p>
                Ser una marca referente en repostería artesanal, reconocida por
                originalidad, sabor inigualable y atención personalizada.
              </p>
            </Section>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            {/* Sección Servicios */}
            <motion.div
              className="mt-15 relative bg-gradient-to-br from-[#f5e4cc] to-[#f9f0e6] shadow-xl rounded-2xl p-8 overflow-hidden"
              variants={fadeInUp}
            >
              <motion.h2
                className="flex items-center text-3xl md:text-4xl font-serif font-bold text-amber-800 mb-6"
                whileHover={{ x: 5 }}
              >
                <Gift size={36} className="mr-3" />
                Nuestros Servicios
              </motion.h2>

              <motion.ul className="space-y-4 text-lg" variants={fadeInStagger}>
                <ServiceItem icon={<Cookie size={20} />}>
                  <strong className="text-amber-800">
                    Cookies estilo New York
                  </strong>{" "}
                  - Grandes, suaves, con centro relleno y tropezones
                  irresistibles
                </ServiceItem>
                <ServiceItem icon={<Cake size={20} />}>
                  <strong className="text-amber-800">
                    Cookie cake personalizadas
                  </strong>{" "}
                  - Para cumpleaños, eventos y ocasiones especiales
                </ServiceItem>
                <ServiceItem icon={<Gift size={20} />}>
                  <strong className="text-amber-800">
                    Regalos personalizados
                  </strong>{" "}
                  - Temáticos para cumpleaños, fechas especiales y detalles
                  corporativos
                </ServiceItem>
                <ServiceItem icon={<Package size={20} />}>
                  <strong className="text-amber-800">
                    Mini cookies y cookie dips
                  </strong>{" "}
                  - Productos por encargo para todos los gustos
                </ServiceItem>
                <ServiceItem icon={<Package size={20} />}>
                  <strong className="text-amber-800">Pedidos especiales</strong>{" "}
                  - Por volumen para celebraciones, empresas y eventos
                </ServiceItem>
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
        {/* Sección Acerca de Mí */}
        <motion.div
          className="relative bg-gradient-to-br from-[#f5e4cc] to-[#f9f0e6] shadow-xl rounded-2xl p-8 overflow-hidden"
          variants={scaleIn}
        >
          <div className="flex flex-col md:flex-row gap-0 items-center">
            <motion.div
              className="w-full md:w-[30%] min-w-[120px] ml-0 md:ml-4"
              whileHover={{ rotate: 2 }}
            >
              <img
                src="/assets/ceo.jpeg"
                alt=""
                className="rounded-xl shadow-md w-85 h-auto object-cover"
              />
            </motion.div>
            <div className="flex-1 ml-4">
              <motion.h2
                className="flex items-center text-3xl md:text-4xl font-serif font-bold text-amber-800 mb-4"
                whileHover={{ x: 5 }}
              >
                <User size={36} className="mr-3" />
                Acerca de Mí
              </motion.h2>
              <div className="text-black text-lg space-y-4 ">
                <p>
                  <motion.span
                    className="font-bold text-amber-800"
                    whileHover={{ scale: 1.05 }}
                  >
                    ¡Hola! Soy Andrea
                  </motion.span>
                  , la mente, manos y corazón detrás de Chew a Cookie. Este
                  proyecto nació de mi pasión por la repostería y las ganas de
                  compartir dulzura real, de esa que te abraza el alma con cada
                  mordisco.
                </p>
                <p>
                  Cada creación que sale de mi cocina está hecha con dedicación,
                  ingredientes de calidad y un toque único que mezcla tradición,
                  creatividad y cariño.
                </p>
                <p>
                  <motion.span className="italic" whileHover={{ scale: 1.03 }}>
                    Gracias por dejarme ser parte de su día a día. 💛
                  </motion.span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        ;
      </section>

      <WhatsAppButton />
      <Footer />
    </main>
  );
}
