import { Routes, Route, Link } from 'react-router-dom'
import FacultadList from './modules/facultad/FacultadList.jsx'
import FacultadForm from './modules/facultad/FacultadForm.jsx'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div>
            <h1 className="app-title">Sistema de Gestión de Mallas Curriculares</h1>
            <p className="app-subtitle">Módulo de Facultades</p>
          </div>
          <nav className="app-nav">
            <Link to="/facultades" className="app-nav-link">
              Facultades
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main-inner">
          <Routes>
            <Route path="/facultades" element={<FacultadList />} />
            <Route path="/facultades/nueva" element={<FacultadForm />} />
            <Route path="/facultades/:id/editar" element={<FacultadForm />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
