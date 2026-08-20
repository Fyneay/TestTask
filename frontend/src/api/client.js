// export const API_URL = 'http://localhost:3000/api';
const host = import.meta.env.APP_HOST
const port = import.meta.env.APP_BACKEND_PORT
export const API_URL= `http://${host}:${port}/api`

export let errorApiData = null

//Берем состояние с провайдера
export const initApiNotify = (handler) => {
   errorApiData=handler
}

export async function apiRequest(endpoint, options) {
  try {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers,
      ...options
    })

    if (!response.ok) {
      const error = await response.json()
      if (errorApiData) {
        const data = error.data ?? error
        const message = typeof data === 'string' ? data : Object.entries(data).map(([field, msg]) => `${field}: ${msg}`).join(' ')
        errorApiData(message, 'danger')
      }
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
