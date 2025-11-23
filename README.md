# 🟦 **README -- Sistema de Gestión de Mallas Curriculares**

## **Módulo 1: Facultad**

Este proyecto corresponde al **primer módulo** del Sistema de Gestión de
Mallas Curriculares, desarrollado para la Universidad dentro del marco
de la materia **GPI**.\
El módulo implementado permite **registrar, modificar y administrar**
las facultades de la institución, cumpliendo estrictamente con los
requerimientos del enunciado académico.

------------------------------------------------------------------------

## 🚀 **Tecnologías utilizadas**

Frontend: - **React 18.3.1** - **Vite** - JavaScript (ES2022) - Fetch
API

Backend: - **Node.js 22.19.0** - **Express.js 5.1.0** - CORS + dotenv

Base de Datos: - **PostgreSQL** - Cliente gráfico: **pgAdmin 4**

Herramientas: - **VS Code** - **Postman** - **Git/GitHub**

------------------------------------------------------------------------

## 🏗️ **Arquitectura general del proyecto**

    gestion-mallas/
       ├── gestion-mallas-backend/
       │     ├── src/
       │     │     ├── controllers/
       │     │     ├── routes/
       │     │     ├── db.js
       │     │     ├── app.js
       │     │     └── server.js
       │     └── package.json
       │
       ├── gestion-mallas-frontend/
       │     ├── src/
       │     │     ├── modules/facultad/
       │     │     ├── App.jsx
       │     │     ├── main.jsx
       │     │     └── index.css
       │     └── package.json
       │
       └── README.md

El módulo "Facultad" se encuentra completamente funcional tanto en el
backend como en el frontend.

------------------------------------------------------------------------

## 🟩 **Descripción del Módulo Facultad**

### ✔ Funcionalidad requerida (enunciado)

> "Permite registrar, modificar y administrar las diferentes facultades
> de la universidad, centralizando la información institucional y
> facilitando la gestión de las carreras que dependen de cada una."

### ✔ Funcionalidades implementadas

Este módulo cumple exactamente con lo solicitado:

### **1. Registrar facultades**

-   Formulario con código, nombre y estado.
-   Validaciones básicas.
-   Inserción real en la BD PostgreSQL.

### **2. Modificar facultades**

-   Edición de registros existentes.
-   Actualización mediante API REST.
-   Sin campos adicionales no solicitados.

### **3. Administrar facultades**

Incluye: - Listado completo de facultades. - Búsqueda por nombre y
código. - Botones para editar y eliminar. - Estado ACTIVA/INACTIVA.

### **4. Persistencia real**

-   PostgreSQL como motor de base de datos.
-   Tabla `facultad` creada especialmente para este módulo.

------------------------------------------------------------------------

## 🗄️ **Base de Datos**

Tabla utilizada:

``` sql
CREATE TABLE facultad (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  estado VARCHAR(10) NOT NULL DEFAULT 'ACTIVA',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

------------------------------------------------------------------------

## 🌐 **API REST (Express 5.1)**

Base URL:

    http://localhost:3000/api/facultades

  Método   Endpoint   Descripción
  -------- ---------- ---------------------------------
  GET      `/`        Lista todas las facultades
  GET      `/:id`     Obtiene una facultad por ID
  POST     `/`        Crea una nueva facultad
  PUT      `/:id`     Modifica una facultad existente
  DELETE   `/:id`     Elimina una facultad

------------------------------------------------------------------------

## 🖥️ **Front-End (React 18)**

Pantallas implementadas:

### ✔ Lista de facultades

-   Tabla simple
-   Búsqueda por nombre/código
-   Botones para editar y eliminar

### ✔ Formulario de facultad

-   Registro de nuevas facultades\
-   Edición de facultades existentes\
-   Validaciones mínimas\
-   Redirecciones apropiadas

### ✔ Integración total con backend

El frontend utiliza `fetch()` para conectarse al API real.

------------------------------------------------------------------------

## ▶️ **Cómo ejecutar el proyecto**

### **1. Backend**

``` bash
cd gestion-mallas-backend
npm install
npm run dev
```

Servidor disponible en:\
👉 http://localhost:3000

### **2. Frontend**

``` bash
cd gestion-mallas-frontend
npm install
npm run dev
```

Sitio disponible en:\
👉 http://localhost:5173

------------------------------------------------------------------------

## 🧪 **Pruebas con Postman**

-   Probar POST `/api/facultades`\
-   Probar GET `/api/facultades`\
-   Probar PUT `/api/facultades/:id`\
-   Probar DELETE `/api/facultades/:id`

------------------------------------------------------------------------

## 🎯 **Estado actual del proyecto**

  Módulo             Estado
  ------------------ --------------
  Facultad           ✅ COMPLETO
  Carrera            ✅ COMPLETO
  Materia            ⏳ Pendiente
  Malla Curricular   ⏳ Pendiente

------------------------------------------------------------------------

## 📌 **Nota final**

Este módulo cumple estrictamente con lo solicitado en el enunciado
académico, implementando únicamente lo requerido sin añadir
características adicionales no especificadas.
