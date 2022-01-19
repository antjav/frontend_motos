import {API} from '../index'

export default async function leerEmpresas(){

  const url = `${API}/empresas`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}