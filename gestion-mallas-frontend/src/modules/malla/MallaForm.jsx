import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getMallaById,
  createMalla,
  updateMalla,
  getCarreras
} from './mallaService'

function MallaForm() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    carrera_id: '',
    cohorte: '',
    descripcion: ''
  })

  const [materias, setMaterias] = useState([
    { nombre: '', prerrequisito: '' }
  ])

  const [carreras, setCarreras] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    cargarCarreras()
    if (esEdicion) cargarMalla()
  }, [id])

  const cargarCarreras = async () => {
    try {
      const data = await getCarreras()
      setCarreras(data)
    } catch (e) {
      console.error('Error al cargar carreras para malla:', e)
    }
  }

  const cargarMalla = async () => {
    try {
      const m = await getMallaById(id)
      setForm({
        carrera_id: m.carrera_id,
        cohorte: m.cohorte,
        descripcion: m.descripcion || ''
      })

      if (Array.isArray(m.materias) && m.materias.length > 0) {
        setMaterias(
          m.materias.map((mat) => ({
            nombre: mat.nombre || '',
            prerrequisito: mat.prerrequisito || ''
          }))
        )
      } else {
        setMaterias([{ nombre: '', prerrequisito: '' }])
      }
    } catch (e) {
      console.error('Error al cargar malla:', e)
      setError('No se pudo cargar la malla seleccionada')
    }
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onChangeMateria = (index, field, value) => {
    setMaterias((prev) => {
      const copia = [...prev]
      copia[index] = { ...copia[index], [field]: value }
      return copia
    })
  }

  const agregarFila = () => {
    setMaterias((prev) => [...prev, { nombre: '', prerrequisito: '' }])
  }

  const eliminarFila = (index) => {
    setMaterias((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.carrera_id || !form.cohorte) {
      setError('Carrera y cohorte son obligatorios')
      return
    }

    if (Number(form.cohorte) <= 0) {
      setError('El cohorte debe ser un año válido mayor a 0')
      return
    }

    const materiasLimpias = materias
      .filter((m) => m.nombre.trim() !== '')
      .map((m) => ({
        nombre: m.nombre.trim(),
        prerrequisito: m.prerrequisito.trim()
      }))

    const payload = {
      carrera_id: Number(form.carrera_id),
      cohorte: Number(form.cohorte),
      descripcion: form.descripcion.trim(),
      materias: materiasLimpias
    }

    setCargando(true)
    try {
      if (esEdicion) {
        await updateMalla(id, payload)
      } else {
        await createMalla(payload)
      }
      navigate('/mallas')
    } catch (e) {
      console.error('Error al guardar malla:', e)
      setError(e.message || 'No se pudo guardar la malla')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <div className="module-header">
        <h2 className="module-title">
          {esEdicion ? 'Editar Malla Curricular' : 'Nueva Malla Curricular'}
        </h2>
      </div>

      {error && <p className="text-error">{error}</p>}

      <form className="card card-narrow form" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label">
            Carrera <span className="text-required">*</span>
          </label>
          <select
            name="carrera_id"
            className="select"
            value={form.carrera_id}
            onChange={onChangeForm}
            required
          >
            <option value="">-- Seleccionar carrera --</option>
            {carreras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Cohorte (año) <span className="text-required">*</span>
          </label>
          <input
            type="number"
            name="cohorte"
            className="input"
            value={form.cohorte}
            onChange={onChangeForm}
            min={2025}
            max={2100}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <input
            name="descripcion"
            className="input"
            value={form.descripcion}
            onChange={onChangeForm}
            placeholder="Ej: Plan 2025 – Actualizado"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Materias y prerrequisitos</label>
          <p className="form-help">
            Agregá las materias de la malla y, si corresponde, su
            prerrequisito.
          </p>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Prerrequisito</th>
                  <th style={{ width: 80 }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {materias.map((m, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className="input"
                        value={m.nombre}
                        onChange={(e) =>
                          onChangeMateria(index, 'nombre', e.target.value)
                        }
                        placeholder="Nombre de la materia"
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        value={m.prerrequisito}
                        onChange={(e) =>
                          onChangeMateria(
                            index,
                            'prerrequisito',
                            e.target.value
                          )
                        }
                        placeholder="Ej: Introducción a..."
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="link-action link-danger"
                        onClick={() => eliminarFila(index)}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={agregarFila}
            style={{ marginTop: '0.5rem' }}
          >
            Agregar materia
          </button>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={cargando}>
            {esEdicion ? 'Guardar cambios' : 'Crear Malla'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/mallas')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default MallaForm
