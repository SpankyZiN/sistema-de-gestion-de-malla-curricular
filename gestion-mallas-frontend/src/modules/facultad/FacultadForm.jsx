import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getFacultadById,
  createFacultad,
  updateFacultad
} from './facultadService'

function FacultadForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    estado: 'ACTIVA'
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (esEdicion) {
      cargarFacultad()
    }
  }, [id])

  const cargarFacultad = async () => {
    try {
      setCargando(true)
      setError('')
      const data = await getFacultadById(id)
      setForm({
        codigo: data.codigo || '',
        nombre: data.nombre || '',
        estado: data.estado || 'ACTIVA'
      })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al cargar la facultad')
    } finally {
      setCargando(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.codigo.trim() || !form.nombre.trim()) {
      setError('Código y nombre son obligatorios')
      return
    }

    try {
      setCargando(true)
      if (esEdicion) {
        await updateFacultad(id, form)
        alert('Facultad actualizada correctamente')
      } else {
        await createFacultad(form)
        alert('Facultad creada correctamente')
      }
      navigate('/facultades')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al guardar la facultad')
    } finally {
      setCargando(false)
    }
  }

  const handleCancelar = () => {
    navigate('/facultades')
  }

  return (
    <div className="card card-narrow">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            {esEdicion ? 'Editar Facultad' : 'Nueva Facultad'}
          </h2>
          <p className="card-subtitle">
            Completá los datos básicos de la facultad.
          </p>
        </div>
      </div>

      {cargando && <p className="text-muted">Cargando...</p>}
      {error && <p className="text-error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">
            Código<span className="text-required">*</span>
          </label>
          <input
            type="text"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Ej: FCE"
            className="input"
            required
          />
          <p className="form-help">
            Código corto para identificar la facultad (máx. 10 caracteres).
          </p>
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
            placeholder="Ej: Facultad de Ciencias Económicas"
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="select"
          >
            <option value="ACTIVA">ACTIVA</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {esEdicion ? 'Guardar cambios' : 'Crear Facultad'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FacultadForm
