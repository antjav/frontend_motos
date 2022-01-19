import {API} from '../index'

export default async function eliminarCliente(id){
  const url = `${API}/clientes/${id}`

  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}