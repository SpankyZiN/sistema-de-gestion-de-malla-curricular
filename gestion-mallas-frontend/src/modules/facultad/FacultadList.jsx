import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getFacultades, deleteFacultad } from './facultadService'


function FacultadList() {
  const [facultades, setFacultades] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    cargarDatos()
  }, [])

    useEffect(() => {
    const abrirManual = (e) => {
      if (e.key === 'F1') {
        e.preventDefault()
        window.open('/manuales/Manual_Facultad.pdf', '_blank')
      }
    }

    window.addEventListener('keydown', abrirManual)
    return () => window.removeEventListener('keydown', abrirManual)
  }, [])


  const cargarDatos = async () => {
    try {
      setCargando(true)
      setError('')
      const data = await getFacultades()
      setFacultades(data)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al cargar facultades')
    } finally {
      setCargando(false)
    }
  }

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar esta facultad?')
    if (!confirmar) return

    try {
      await deleteFacultad(id)
      await cargarDatos()
    } catch (err) {
      console.error(err)
      alert(err.message || 'Error al eliminar la facultad')
    }
  }

  const facultadesFiltradas = facultades.filter((f) =>
    f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    f.codigo.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Facultades</h2>
          <p className="card-subtitle">
            Gestioná las facultades de la universidad (crear, editar y eliminar).
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/facultades/nueva')}
        >
          + Nueva Facultad
        </button>
      </div>

      <div className="card-toolbar">
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input"
        />
      </div>

      {error && <p className="text-error">{error}</p>}

      {cargando ? (
        <p className="text-muted">Cargando...</p>
      ) : facultadesFiltradas.length === 0 ? (
        <p className="text-muted">No hay facultades registradas.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th className="table-actions-col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facultadesFiltradas.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td className="mono">{f.codigo}</td>
                  <td>{f.nombre}</td>
                  <td>
                    <span
                      className={
                        f.estado === 'ACTIVA'
                          ? 'badge badge-success'
                          : 'badge badge-muted'
                      }
                    >
                      {f.estado}
                    </span>
                  </td>
                  <td className="table-actions">
                    <Link
                      to={`/facultades/${f.id}/editar`}
                      className="link-action"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="link-action link-danger"
                      onClick={() => handleEliminar(f.id)}
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
  )
}

export default FacultadList
