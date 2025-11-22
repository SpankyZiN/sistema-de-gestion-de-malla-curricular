import { useEffect, useState, type ReactNode } from "react";
import { getFacultades, deleteFacultad } from "../services/facultadService";
import { Link, useNavigate } from "react-router";

type Facultad = {
  id: string;
  codigo: string;
  nombre: string;
  estado: "ACTIVA" | string;
};

export default function Facultades() {
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    const abrirManual = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        window.open("/manuales/Manual_Facultad.pdf", "_blank");
      }
    };

    window.addEventListener("keydown", abrirManual);
    return () => window.removeEventListener("keydown", abrirManual);
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await getFacultades();
      setFacultades(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar facultades");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id: string) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta facultad?",
    );
    if (!confirmar) return;

    try {
      await deleteFacultad(id);
      await cargarDatos();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la facultad");
    }
  };

  const facultadesFiltradas = facultades.filter(
    (f) =>
      f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.codigo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg shadow-gray-900/5">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Facultades</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Gestioná las facultades de la universidad (crear, editar y
            eliminar).
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-transparent px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap transition duration-150 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-violet-700"
          onClick={() => {
            navigate("/facultades/nueva");
          }}
        >
          + Nueva Facultad
        </button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-gray-300 text-base outline-none transition duration-150 bg-gray-50 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 focus:bg-white"
        />
      </div>

      {error && <p className="text-red-700 text-sm">{error}</p>}

      {cargando ? (
        <p className="text-gray-500 text-sm">Cargando...</p>
      ) : facultadesFiltradas.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay facultades registradas.</p>
      ) : (
        <div className="mt-2 rounded-xl overflow-x-auto border border-gray-200 shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3.5 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200">
                  ID
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200">
                  Código
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200">
                  Nombre
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200">
                  Estado
                </th>
                <th className="px-3.5 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200 w-36">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {facultadesFiltradas.map((f) => (
                <tr
                  key={f.id}
                  className="even:bg-gray-50 hover:bg-indigo-50/50 transition-colors"
                >
                  <td className="px-3.5 py-2.5">{f.id}</td>
                  <td className="px-3.5 py-2.5 font-mono">{f.codigo}</td>
                  <td className="px-3.5 py-2.5">{f.nombre}</td>
                  <td className="px-3.5 py-2.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        f.estado === "ACTIVA"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {f.estado}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 w-36">
                    <div className="flex gap-2">
                      <Link
                        to={`/facultades/${f.id}/editar`}
                        className="bg-transparent border-none p-0 text-sm cursor-pointer text-indigo-600 hover:underline transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="bg-transparent border-none p-0 text-sm cursor-pointer text-red-600 hover:underline transition-colors"
                        onClick={() => handleEliminar(f.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
