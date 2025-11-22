import { API_HOST } from "~/constants";

const API_URL = `${API_HOST}/api/facultades`;

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

export async function getFacultades() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function getFacultadById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse(res);
}

export async function createFacultad(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateFacultad(id: string, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteFacultad(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
