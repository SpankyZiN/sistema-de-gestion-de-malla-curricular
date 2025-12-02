const API_URL = "http://localhost:3000/api/materias";
const CARRERA_API_URL = "http://localhost:3000/api/carreras";

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = "Error en la solicitud";
    try {
      const data = await response.json();
      if (data?.message) errorMessage = data.message;
    } catch {}
    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;

  return response.json();
}

export async function getMaterias() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function getMateriaById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse(res);
}

export async function createMateria(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateMateria(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteMateria(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

export async function getCarrerasForSelect() {
  const res = await fetch(CARRERA_API_URL);
  return handleResponse(res);
}