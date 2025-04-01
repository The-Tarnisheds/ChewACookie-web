export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">
        Bienvenido a ChewACookie 🍪
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-48 bg-gray-200 mb-4 rounded-md animate-pulse"></div>
            <h2 className="text-xl font-semibold mb-2">Galleta {item}</h2>
            <p className="text-gray-600">Descripción de la galleta...</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
