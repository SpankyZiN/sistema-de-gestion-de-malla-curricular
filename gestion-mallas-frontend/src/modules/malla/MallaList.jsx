import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getMallas, deleteMalla } from './mallaService'

function MallaList() {
  const [mallas, setMallas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    cargarMallas()
  }, [])

  const cargarMallas = async () => {
    try {
      setCargando(true)
      setError('')
      const data = await getMallas()
      setMallas(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar esta malla?')) return
    try {
      await deleteMalla(id)
      cargarMallas()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div>
      <div className="module-header">
        <h2 className="module-title">Mallas curriculares</h2>
        <button className="btn" onClick={() => navigate('/mallas/nueva')}>
          Nueva Malla
        </button>
      </div>

      {error && <p className="text-error">{error}</p>}

      {cargando ? (
        <p>Cargando...</p>
      ) : mallas.length === 0 ? (
        <p>No hay mallas registradas.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>ID</th>
                <th>Carrera</th>
                <th style={{ width: 100 }}>Cohorte</th>
                <th>Descripción</th>
                <th style={{ width: 140 }}>Materias</th>
                <th className="table-actions-col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mallas.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.carrera_nombre}</td>
                  <td>{m.cohorte}</td>
                  <td>{m.descripcion}</td>
                  <td>
                    {Array.isArray(m.materias) ? m.materias.length : 0}
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link
                        to={`/mallas/${m.id}/editar`}
                        className="link-action"
                      >
                        Editar
                      </Link>
                      <button
                        className="link-action link-danger"
                        onClick={() => eliminar(m.id)}
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

export default MallaList
