import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCarreras, deleteCarrera } from './carreraService'

function CarreraList() {
  const [carreras, setCarreras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    cargarCarreras()
  }, [])

  const cargarCarreras = async () => {
    try {
      setCargando(true)
      const data = await getCarreras()
      setCarreras(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar esta carrera?')) return
    try {
      await deleteCarrera(id)
      cargarCarreras()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div>
      <div className="module-header">
        <h2 className="module-title">Carreras</h2>
        <button className="btn" onClick={() => navigate('/carreras/nueva')}>
          Nueva Carrera
        </button>
      </div>

      {error && <p className="text-error">{error}</p>}

      {cargando ? (
        <p>Cargando...</p>
      ) : carreras.length === 0 ? (
        <p>No hay carreras registradas.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>ID</th>
                <th style={{ width: 120 }}>Código</th>
                <th>Nombre</th>
                <th>Facultad</th>
                <th style={{ width: 140 }}>Estado</th>
                <th className="table-actions-col">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {carreras.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td className="mono">{c.codigo}</td>
                  <td>{c.nombre}</td>
                  <td>{c.facultad_nombre}</td>

                  <td>
                    <span
                      className={`badge ${
                        c.estado === 'ACTIVA'
                          ? 'badge-success'
                          : 'badge-muted'
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <Link to={`/carreras/${c.id}/editar`} className="link-action">
                        Editar
                      </Link>

                      <button
                        className="link-action link-danger"
                        onClick={() => eliminar(c.id)}
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
  )
}

export default CarreraList
