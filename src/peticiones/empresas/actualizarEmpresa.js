import {API} from '../index'

export default async function actualizarEmpresas(body){
  const url = `${API}/empresas/actualizar`

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