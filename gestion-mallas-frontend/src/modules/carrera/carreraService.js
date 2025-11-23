const API_URL = 'http://localhost:3000/api/carreras'
const FACULTADES_URL = 'http://localhost:3000/api/facultades'

async function handleResponse(response) {
  if (!response.ok) {
    let msg = 'Error en la solicitud'
    try {
      const data = await response.json()
      if (data?.message) msg = data.message
    } catch {}
    throw new Error(msg)
  }
  return response.json()
}

export async function getCarreras() {
  return handleResponse(await fetch(API_URL))
}

export async function getCarreraById(id) {
  return handleResponse(await fetch(`${API_URL}/${id}`))
}

export async function createCarrera(data) {
  return handleResponse(await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }))
}

export async function updateCarrera(id, data) {
  return handleResponse(await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }))
}

export async function deleteCarrera(id) {
  return handleResponse(await fetch(`${API_URL}/${id}`, { method: 'DELETE' }))
}

export async function getFacultades() {
  return handleResponse(await fetch(FACULTADES_URL))
}
