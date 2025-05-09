// components/WhatsAppButton.tsx
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const phoneNumber = "56977227444";
  const message = "¡Hola! Me gustaría comprar galletas.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300); // pequeño delay elegante
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transform transition-all duration-500 ease-out hover:scale-110 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      title="Contáctanos por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
