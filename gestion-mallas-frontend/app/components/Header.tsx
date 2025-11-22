import { Link } from "react-router";

export function Header({ title, to }: { title: string; to: string }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Sistema de Gestión de Mallas Curriculares
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Módulo de {title}</p>
        </div>
        <nav className="flex gap-3">
          <Link
            to={{
              pathname: `${to}`,
            }}
            className="px-3 py-1.5 rounded-full text-sm border border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-50 transition"
          >
            {title}
          </Link>
        </nav>
      </div>
    </header>
  );
}
