import { API } from '../index'

export default async function actualizarRevisiones(body){
  const url = `${API}/revision`

  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const response = await request.json()
  return response
}