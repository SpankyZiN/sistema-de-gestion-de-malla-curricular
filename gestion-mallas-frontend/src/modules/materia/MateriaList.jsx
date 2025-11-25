import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMaterias, deleteMateria } from "./materiaService";

function MateriaList() {
  const [materias, setMaterias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    const abrirManual = (e) => {
      if (e.key === "F1") {
        e.preventDefault();
        window.open("/manuales/Manual_Materia.pdf", "_blank");
      }
    };

    window.addEventListener("keydown", abrirManual);
    return () => window.removeEventListener("keydown", abrirManual);
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await getMaterias();
      setMaterias(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al cargar materias");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta materia?",
    );
    if (!confirmar) return;

    try {
      await deleteMateria(id);
      await cargarDatos();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al eliminar la materia");
    }
  };

  const materiasFiltradas = materias.filter(
    (m) =>
      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      (m.carrera_nombre &&
        m.carrera_nombre.toLowerCase().includes(busqueda.toLowerCase())),
  );

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Materias</h2>
          <p className="card-subtitle">
            Gestioná las materias de la universidad (crear, editar y eliminar).
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/materias/nueva")}
        >
          + Nueva Materia
        </button>
      </div>

      <div className="card-toolbar">
        <input
          type="text"
          placeholder="Buscar por nombre, código o carrera..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input"
        />
      </div>

      {error && <p className="text-error">{error}</p>}

      {cargando ? (
        <p className="text-muted">Cargando...</p>
      ) : materiasFiltradas.length === 0 ? (
        <p className="text-muted">No hay materias registradas.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Carrera</th> {/* Nuevo campo */}
                <th>Estado</th>
                <th className="table-actions-col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materiasFiltradas.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td className="mono">{m.codigo}</td>
                  <td>{m.nombre}</td>
                  <td>{m.carrera_nombre}</td>{" "}
                  {/* Muestra el nombre de la carrera */}
                  <td>
                    <span
                      className={
                        m.estado === "ACTIVA"
                          ? "badge badge-success"
                          : "badge badge-muted"
                      }
                    >
                      {m.estado}
                    </span>
                  </td>
                  <td className="table-actions">
                    <Link
                      to={`/materias/${m.id}/editar`}
                      className="link-action"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="link-action link-danger"
                      onClick={() => handleEliminar(m.id)}
                    >
                      Eliminar
                    </button>
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

export default MateriaList;
