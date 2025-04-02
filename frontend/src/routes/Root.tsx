import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "../components/Header";

export default function Root() {
  return (
    <div className="min-h-screen bg-beige">
      <Header />
      <main className="bg-beige container mx-auto p-4">
        <Outlet />
      </main>
      {/* Footer (opcional) */}
    </div>
  );
}
