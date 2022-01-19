import { API } from '../index'

export default async function leerRevision(){

  const url = `${API}/revision/estados`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}