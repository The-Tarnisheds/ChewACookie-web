import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "../components/Header";

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      {/* Footer (opcional) */}
    </div>
  );
}
