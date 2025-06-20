import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

interface EditableFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  onSave: (value: string) => Promise<void>;
  validation?: (value: string) => string | null;
  inputType?: string;
}

export const EditableField = ({
  label,
  value,
  icon,
  onSave,
  validation,
  inputType = "text",
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (validation) {
      const validationError = validation(currentValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    try {
      await onSave(currentValue);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Error al guardar los cambios");
    }
  };

  return (
    <motion.div className="flex items-center group mb-4" whileHover={{ x: 5 }}>
      <motion.div
        className="bg-[#ffdede] p-3 rounded-full mr-4 group-hover:bg-[#af040d] transition-colors"
        whileHover={{ rotate: isEditing ? 0 : 10, scale: isEditing ? 1 : 1.1 }}
      >
        {icon}
      </motion.div>

      <div className="flex-grow">
        <p style={{ fontFamily: "Poppins" }} className="text-sm text-gray-500">
          {label}
        </p>

        {isEditing ? (
          <div className="mt-1">
            <input
              type={inputType}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full p-2 border rounded text-lg font-medium text-[#592d17]"
              style={{ fontFamily: "Poppins" }}
            />
            {error && (
              <p
                style={{ fontFamily: "Poppins" }}
                className="text-red-500 text-sm mt-1"
              >
                {error}
              </p>
            )}
          </div>
        ) : (
          <p
            style={{ fontFamily: "Poppins" }}
            className="text-lg font-medium text-[#592d17] group-hover:text-[#af040d] transition-colors"
          >
            {value}
          </p>
        )}
      </div>

      <div className="ml-4">
        {isEditing ? (
          <div className="flex space-x-2">
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 hover:text-green-800"
            >
              <FaCheck />
            </motion.button>
            <motion.button
              onClick={() => {
                setIsEditing(false);
                setCurrentValue(value);
                setError(null);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-red-600 hover:text-red-800"
            >
              <FaTimes />
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#af040d] hover:text-[#8a030a]"
          >
            <FaEdit />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
