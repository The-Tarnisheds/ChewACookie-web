import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCheck, FaTimes } from "react-icons/fa";

interface Address {
  calle: string;
  numero: string;
  comuna: string;
  region: string;
}

interface EditableAddressProps {
  address: Address | null;
  onSave: (address: Address) => Promise<void>;
}

export const EditableAddress = ({ address, onSave }: EditableAddressProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address>(
    address || { calle: "", numero: "", comuna: "", region: "" }
  );
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (
      !currentAddress.calle ||
      !currentAddress.numero ||
      !currentAddress.comuna ||
      !currentAddress.region
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await onSave(currentAddress);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Error al guardar la dirección");
    }
  };

  return (
    <div className="space-y-2 flex-grow">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label
              style={{ fontFamily: "Poppins" }}
              className="text-sm text-gray-500"
            >
              Calle
            </label>
            <input
              value={currentAddress.calle}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, calle: e.target.value })
              }
              className="w-full p-2 border rounded text-[#592d17]"
              style={{ fontFamily: "Poppins" }}
            />
          </div>
          <div>
            <label
              style={{ fontFamily: "Poppins" }}
              className="text-sm text-gray-500"
            >
              Número
            </label>
            <input
              value={currentAddress.numero}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, numero: e.target.value })
              }
              className="w-full p-2 border rounded text-[#592d17]"
              style={{ fontFamily: "Poppins" }}
            />
          </div>
          <div>
            <label
              style={{ fontFamily: "Poppins" }}
              className="text-sm text-gray-500"
            >
              Comuna
            </label>
            <input
              value={currentAddress.comuna}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, comuna: e.target.value })
              }
              className="w-full p-2 border rounded text-[#592d17]"
              style={{ fontFamily: "Poppins" }}
            />
          </div>
          <div>
            <label
              style={{ fontFamily: "Poppins" }}
              className="text-sm text-gray-500"
            >
              Región
            </label>
            <input
              value={currentAddress.region}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, region: e.target.value })
              }
              className="w-full p-2 border rounded text-[#592d17]"
              style={{ fontFamily: "Poppins" }}
            />
          </div>
          {error && (
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-red-500 text-sm"
            >
              {error}
            </p>
          )}
          <div className="flex space-x-2 justify-end">
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-[#af040d] text-white rounded"
            >
              <FaCheck />
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
            >
              <FaTimes />
            </motion.button>
          </div>
        </div>
      ) : address ? (
        <motion.div whileHover={{ x: 5 }}>
          <div className="flex items-start">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
              <FaMapMarkerAlt className="text-[#af040d] mt-1 mr-2" />
            </motion.div>
            <div>
              <p
                style={{ fontFamily: "Poppins" }}
                className="text-[#592d17] hover:text-[#af040d] transition-colors"
              >
                {address.calle} #{address.numero}
              </p>
              <p
                style={{ fontFamily: "Poppins" }}
                className="text-[#592d17] hover:text-[#af040d] transition-colors"
              >
                {address.comuna}, {address.region}
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <p style={{ fontFamily: "Poppins" }} className="text-gray-500 italic">
          No hay dirección registrada
        </p>
      )}
    </div>
  );
};
