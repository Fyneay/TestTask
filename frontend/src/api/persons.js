import {apiRequest} from "src/api/client";

export function getAllPersons() {
  return apiRequest("/persons/");
}

export function getPerson(id) {
  return apiRequest(`/persons/${id}`);
}

export function createPerson(data) {
  return apiRequest(`/persons`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updatePerson(id, data) {
  return apiRequest(`/persons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deletePerson(id) {
  return apiRequest(`/persons/${id}`, {
    method: 'DELETE',
  })
}
