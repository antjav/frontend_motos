import { API } from '../index'

export default async function leerTransaccionesEntregas(){

  const url = `${API}/entrega`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}