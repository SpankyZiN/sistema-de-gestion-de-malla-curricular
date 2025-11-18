const API_URL = 'http://localhost:3000/api/facultades'

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = 'Error en la solicitud'
    try {
      const data = await response.json()
      if (data?.message) errorMessage = data.message
    } catch {
    }
    throw new Error(errorMessage)
  }

  if (response.status === 204) return null

  return response.json()
}

export async function getFacultades() {
  const res = await fetch(API_URL)
  return handleResponse(res)
}

export async function getFacultadById(id) {
  const res = await fetch(`${API_URL}/${id}`)
  return handleResponse(res)
}

export async function createFacultad(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

export async function updateFacultad(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

export async function deleteFacultad(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  return handleResponse(res)
}
