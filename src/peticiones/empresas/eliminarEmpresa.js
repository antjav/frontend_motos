import {API} from '../index'

export default async function eliminarEmpresa(id){
  const url = `${API}/empresas/${id}`

  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}