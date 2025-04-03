import { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Cookie {
  id: number;
  name: string;
  price: number;
  image: string;
}

const initialCookies: Cookie[] = [
  {
    id: 1,
    name: "Chocochips",
    price: 1250,
    image: "assets/galletitablanca.png",
  },
  {
    id: 2,
    name: "Chocochips",
    price: 1250,
    image: "assets/galletitablanca.png",
  },
  {
    id: 3,
    name: "Chocochips",
    price: 1250,
    image: "assets/galletitablanca.png",
  },
  { id: 4, name: "Vainilla", price: 1300, image: "assets/galletitablanca.png" },
  { id: 5, name: "Oreo", price: 1500, image: "assets/galletitablanca.png" },
];

export default function HomePage() {
  const [cookies] = useState<Cookie[]>(initialCookies);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <main>
      {/* Sección principal */}
      <header className="container mx-auto px-4 pt-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="hidden md:block w-[35%] max-w-[400px]">
            <img
              src="assets/cookieHand.png"
              alt="Mano con galleta"
              className="w-full h-auto max-h-[70vh] object-contain" // Solo añadimos max-height
            />
          </div>

          <div className="w-full md:w-[30%] text-center md:text-left">
            <h1 className="font-serif text-6xl font-bold">
              <span className="text-black">Elige tu </span>
              <br />
              <span className="text-amber-800">Cookie Mood</span>
            </h1>
            <div className="mt-1 space-y-1">
              <p className="font-sans text-xl md:text-2xl text-black italic">
                Amor en cada mordida
              </p>
              <p className="font-sans text-lg md:text-xl text-black">
                Hechas con ingredientes de calidad
              </p>
            </div>
          </div>

          <div className="w-[80%] md:w-[35%] max-w-[400px] mx-auto md:mx-0">
            <img
              src="assets/galletitablanca.png"
              alt="Galleta decorativa"
              className="w-full h-auto max-h-[60vh] object-contain"
            />
          </div>
        </div>
      </header>

      {/* Sección de productos */}
      <section className="relative container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8">MENU</h2>

        <div className="relative">
          {/* Flechas de navegación */}
          <button
            onClick={() => scroll(-300)}
            className="hidden md:block absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-redchew text-white p-3 rounded-full hover:bg-brownchew z-10"
          >
            <FaArrowLeft size={24} />
          </button>

          <button
            onClick={() => scroll(300)}
            className="hidden md:block absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-redchew text-white p-3 rounded-full hover:bg-brownchew z-10"
          >
            <FaArrowRight size={24} />
          </button>

          {/* Contenedor de cards */}
          <div
            ref={scrollContainer}
            className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide"
          >
            {cookies.map((cookie) => (
              <div
                key={cookie.id}
                className="flex-shrink-0 w-[300px] bg-white rounded-xl shadow-md p-6"
              >
                <img
                  src={cookie.image}
                  alt={cookie.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-2xl font-bold text-center mb-2">
                  {cookie.name}
                </h3>
                <p className="text-xl font-bold text-center text-amber-800 mb-4">
                  ${cookie.price.toLocaleString()}
                </p>
                <button className="w-full bg-redchew text-white py-2 rounded-xl hover:bg-brownchew transition-colors">
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
