import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getCarreraById,
  createCarrera,
  updateCarrera,
  getFacultades
} from './carreraService'

function CarreraForm() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    estado: 'ACTIVA',
    facultad_id: ''
  })

  const [facultades, setFacultades] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    cargarFacultades()
    if (esEdicion) cargarCarrera()
  }, [id])

  const cargarFacultades = async () => {
    const data = await getFacultades()
    // opcional lógico: solo activas
    setFacultades(data.filter(f => f.estado === 'ACTIVA'))
  }

  const cargarCarrera = async () => {
    const c = await getCarreraById(id)
    setForm({
      codigo: c.codigo,
      nombre: c.nombre,
      estado: c.estado,
      facultad_id: c.facultad_id
    })
  }

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.codigo || !form.nombre || !form.facultad_id) {
      setError('Código, nombre y facultad son obligatorios')
      return
    }

    setCargando(true)
    try {
      if (esEdicion) await updateCarrera(id, form)
      else await createCarrera(form)
      navigate('/carreras')
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <div className="module-header">
        <h2 className="module-title">
          {esEdicion ? 'Editar Carrera' : 'Nueva Carrera'}
        </h2>
      </div>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={onSubmit} className="form-card">
        <div className="form-group">
          <label>Código*</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nombre*</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Facultad*</label>
          <select
            name="facultad_id"
            value={form.facultad_id}
            onChange={onChange}
            required
          >
            <option value="">-- Seleccionar --</option>
            {facultades.map(f => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={onChange}>
            <option value="ACTIVA">ACTIVA</option>
            <option value="INACTIVA">INACTIVA</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn" type="submit" disabled={cargando}>
            {esEdicion ? 'Guardar cambios' : 'Crear Carrera'}
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => navigate('/carreras')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CarreraForm
