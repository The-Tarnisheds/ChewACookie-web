import CookieList from "../components/CookieList";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function HomePage() {
  return (
    <main>
      {/* Sección principal */}
      <header className="container mx-auto px-4 pt-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="hidden -ml-8 md:block  max-w-[400px]">
            <img
              src="assets/cookieHand.png"
              alt="Mano con galleta"
              className="w-full h-auto  object-contain"
            />
          </div>

          <div className="w-full md:w-[30%] text-center md:text-left">
            <h1 className="font-serif text-6xl font-bold">
              <span  className="text-black">Elige tu </span>
              <br />
              <span className="text-amber-800">Cookie Mood</span>
            </h1>
            <div className="mt-1 space-y-1">
              <p style={{ fontFamily: 'Poppins' }} className="font-sans text-xl md:text-2xl text-black italic">
                Amor en cada mordida
              </p>
              <p style={{ fontFamily: 'Poppins' }} className="font-sans text-lg md:text-xl text-black">
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
      <CookieList />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
