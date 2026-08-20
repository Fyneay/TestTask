import { apiRequest} from "src/api/client";

export async function getAllTeams(limit=3, offset=0) {
  return apiRequest(`/teams?limit=${limit}&offset=${offset}`);
}

export async function getTeam(id) {
  return apiRequest(`/teams/${id}`);
}

export async function createTeam(team) {
  return apiRequest(`/teams`, {
    method: 'POST',
    body: JSON.stringify(team),
  })
}

export async function deleteTeam(id) {
  return apiRequest(`/teams/${id}`, {
    method: 'DELETE',
  })
}

export async function updateTeam(id, team) {
  return apiRequest(`/teams/${id}`, {
    method: 'PUT',
    body: JSON.stringify(team),
  })
}
