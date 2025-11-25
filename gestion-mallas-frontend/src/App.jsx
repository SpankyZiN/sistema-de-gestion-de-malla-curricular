import { Routes, Route, Link, useLocation } from "react-router-dom";
import FacultadList from "./modules/facultad/FacultadList.jsx";
import FacultadForm from "./modules/facultad/FacultadForm.jsx";
import CarreraList from "./modules/carrera/CarreraList.jsx";
import CarreraForm from "./modules/carrera/CarreraForm.jsx";
import MateriaList from "./modules/materia/MateriaList.jsx";
import MateriaForm from "./modules/materia/MateriaForm.jsx";

function App() {
  const location = useLocation();

  let subtitle = "Módulo de Facultades";
  if (location.pathname.startsWith("/carreras")) {
    subtitle = "Módulo de Carreras";
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div>
            <h1 className="app-title">
              Sistema de Gestión de Mallas Curriculares
            </h1>
            <p className="app-subtitle">{subtitle}</p>
          </div>

          <nav className="app-nav">
            <Link to="/facultades" className="app-nav-link">
              Facultades
            </Link>
            <Link to="/carreras" className="app-nav-link">
              Carreras
            </Link>
            <Link to="/materias" className="app-nav-link">
              Materias
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

            <Route path="/carreras" element={<CarreraList />} />
            <Route path="/carreras/nueva" element={<CarreraForm />} />
            <Route path="/carreras/:id/editar" element={<CarreraForm />} />

            <Route path="/materias" element={<MateriaList />} />
            <Route path="/materias/nueva" element={<MateriaForm />} />
            <Route path="/materias/:id/editar" element={<MateriaForm />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
