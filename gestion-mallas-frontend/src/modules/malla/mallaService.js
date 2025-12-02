const API_URL = 'http://localhost:3000/api/mallas'
const CARRERAS_URL = 'http://localhost:3000/api/carreras'

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

export async function getMallas() {
  return handleResponse(await fetch(API_URL))
}

export async function getMallaById(id) {
  return handleResponse(await fetch(`${API_URL}/${id}`))
}

export async function createMalla(data) {
  return handleResponse(
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  )
}

export async function updateMalla(id, data) {
  return handleResponse(
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  )
}

export async function deleteMalla(id) {
  return handleResponse(
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
  )
}

export async function getCarreras() {
  return handleResponse(await fetch(CARRERAS_URL))
}
