import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMateriaById,
  createMateria,
  updateMateria,
  getCarrerasForSelect,
} from "./materiaService";

function MateriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    estado: "ACTIVA",
    carrera_id: "",
  });

  const [carreras, setCarreras] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarCarreras();
    if (esEdicion) {
      cargarMateria();
    }
  }, [id]);

  const cargarCarreras = async () => {
    try {
      const data = await getCarrerasForSelect();
      setCarreras(data);
    } catch (err) {
      console.error("Error al cargar carreras:", err);
      setError("Error al cargar la lista de carreras.");
    }
  };

  const cargarMateria = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await getMateriaById(id);
      setForm({
        codigo: data.codigo || "",
        nombre: data.nombre || "",
        estado: data.estado || "ACTIVA",
        carrera_id: data.carrera_id || "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al cargar la materia");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "carrera_id" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.codigo.trim() || !form.nombre.trim() || !form.carrera_id) {
      setError("Código, nombre y carrera son obligatorios");
      return;
    }

    try {
      setCargando(true);
      if (esEdicion) {
        await updateMateria(id, form);
        alert("Materia actualizada correctamente");
      } else {
        await createMateria(form);
        alert("Materia creada correctamente");
      }
      navigate("/materias");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al guardar la materia");
    } finally {
      setCargando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/materias");
  };

  return (
    <div className="card card-narrow">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            {esEdicion ? "Editar Materia" : "Nueva Materia"}
          </h2>
          <p className="card-subtitle">
            Completá los datos básicos de la materia y asignale una carrera.
          </p>
        </div>
      </div>

      {cargando && <p className="text-muted">Cargando...</p>}
      {error && <p className="text-error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">
            Carrera<span className="text-required">*</span>
          </label>
          <select
            name="carrera_id"
            value={form.carrera_id}
            onChange={handleChange}
            className="select"
            required
            disabled={cargando}
          >
            <option value="">Selecciona una carrera</option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.codigo} - {carrera.nombre}
              </option>
            ))}
          </select>
          {carreras.length === 0 && !cargando && (
            <p className="form-help text-error">
              No hay carreras activas para seleccionar.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Código<span className="text-required">*</span>
          </label>
          <input
            type="text"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Ej: CAL101"
            className="input"
            required
            disabled={cargando}
          />
          <p className="form-help">Código corto para identificar la materia.</p>
        </div>

        <div className="form-group">
          <label className="form-label">
            Nombre<span className="text-required">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Cálculo I"
            className="input"
            required
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="select"
            disabled={cargando}
          >
            <option value="ACTIVA">ACTIVA</option>
            <option value="INACTIVA">INACTIVA</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {esEdicion ? "Guardar cambios" : "Crear Materia"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancelar}
            disabled={cargando}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default MateriaForm;
