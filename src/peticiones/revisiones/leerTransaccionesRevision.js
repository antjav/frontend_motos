import { API } from '../index'

export default async function leerTransaccionesRevision(){

  const url = `${API}/revision`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}