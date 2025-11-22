import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import {
  getFacultadById,
  createFacultad,
  updateFacultad,
} from "~/services/facultadService";
import { Link, useNavigate, useParams } from "react-router";

export function FacultadForm() {
  const navigate = useNavigate();
  const params = useParams();
  const facultadId = params.id;

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    estado: "ACTIVA",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarFacultad = useCallback(async () => {
    if (!facultadId) return;

    try {
      setCargando(true);
      setError("");
      const data = await getFacultadById(facultadId);
      setForm({
        codigo: data.codigo || "",
        nombre: data.nombre || "",
        estado: data.estado || "ACTIVA",
      });
    } catch (err) {
      console.error(err);
      setError("Error al cargar la facultad");
    } finally {
      setCargando(false);
    }
  }, [facultadId]);

  useEffect(() => {
    if (facultadId) {
      cargarFacultad();
    }
  }, [facultadId, cargarFacultad]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.codigo.trim() || !form.nombre.trim()) {
      setError("Código y nombre son obligatorios");
      return;
    }

    try {
      setCargando(true);
      if (facultadId) {
        await updateFacultad(facultadId, form);
        alert("Facultad actualizada correctamente");
      } else {
        await createFacultad(form);
        alert("Facultad creada correctamente");
      }
      navigate("/facultades");
    } catch (err) {
      console.error(err);
      setError("Error al guardar la facultad");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg shadow-gray-900/5 max-w-md mx-auto mt-8">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {facultadId ? "Editar Facultad" : "Nueva Facultad"}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Completá los datos básicos de la facultad.
          </p>
        </div>
      </div>

      {cargando && <p className="text-gray-500 text-sm">Cargando...</p>}
      {error && <p className="text-red-700 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Código<span className="text-red-600 ml-0.5">*</span>
          </label>
          <input
            type="text"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Ej: FCE"
            className="w-full p-2.5 rounded-lg border border-gray-300 text-base outline-none transition duration-150 bg-gray-50 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 focus:bg-white"
            required
            maxLength={10}
          />
          <p className="text-xs text-gray-500">
            Código corto para identificar la facultad (máx. 10 caracteres).
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Nombre<span className="text-red-600 ml-0.5">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Facultad de Ciencias Económicas"
            className="w-full p-2.5 rounded-lg border border-gray-300 text-base outline-none transition duration-150 bg-gray-50 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 focus:bg-white"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 text-base outline-none transition duration-150 bg-gray-50 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 focus:bg-white"
          >
            <option value="ACTIVA">ACTIVA</option>
            <option value="INACTIVA">INACTIVA</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-transparent px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap transition duration-150 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-violet-700"
            disabled={cargando}
          >
            {facultadId ? "Guardar cambios" : "Crear Facultad"}
          </button>

          <Link
            to={"/facultades"}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap transition duration-150 bg-white text-gray-700 shadow-sm hover:bg-gray-100"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
