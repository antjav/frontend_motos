import { API } from '../index'

export default async function leerEstadoEntregas(){

  const url = `${API}/entrega/estados`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}