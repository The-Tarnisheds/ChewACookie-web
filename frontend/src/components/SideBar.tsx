import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();
    return(
    <div className="min-h-screen">
        <motion.div
            className="w-64 bg-brownchew shadow-xl min-h-screen rounded-md"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            <img
                src="assets/Logo.png"
                alt="Logo"
                className="w-48 mx-auto py-6 object-contain filter brightness-0 invert"
            />
            </motion.div>

            <motion.button
            onClick={() => navigate("/admin-crud")}
            className="w-full py-3 px-6 text-whitechew text-left hover:bg-lightbrownchew transition-colors flex items-center"
            whileHover={{ x: 5 }}
            >
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
            </svg>
            Gestión de productos
            </motion.button>
            <motion.button
            onClick={() => navigate("/admin-dashboard")}
            className="w-full py-3 px-6 text-whitechew text-left hover:bg-lightbrownchew transition-colors flex items-center"
            whileHover={{ x: 5 }}
            >
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
            </svg>
            Dashboard
            </motion.button>
        </motion.div>
    </div>
    )
    
}
