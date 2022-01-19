import { useState, useEffect } from 'react'
import updateCliente from '../peticiones/clientes/actualizarClientes'
import deleteCliente from '../peticiones/clientes/eliminarCliente'
import readClientes from '../peticiones/clientes/leerClientes'

const datosIniciales = {
  cliente_id: '',
  cliente_cedula: '',
  cliente_nombre: '',
  cliente_apellido: '',
  cliente_correo: '',
  cliente_fechanacimiento: '',
  cliente_telefono: ''
}

export default function Clientes() {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)

  const [form, setForm] = useState(datosIniciales)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.cliente_id|| !form.cliente_cedula|| !form.cliente_nombre|| !form.cliente_apellido||
      !form.cliente_correo|| !form.cliente_fechanacimiento|| !form.cliente_telefono ) {
      alert('Datos incompletos')
      return
    }else{
      const actualizacion = async () => {
        const res = await updateCliente(form)
        alert(res.mensaje)
        setReload(!reload)
        setForm(datosIniciales)
      }
      actualizacion()
    }
  }

  useEffect(function(){
    readClientes().then(v => setData(v))
  }, [reload])

  return (
    <>
      <div>
        <h1 className='titulo'>CRUD de Clientes</h1>
        <div>
          <h3 className='subtitulo'>Crea o actualiza un cliente</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="cliente_id" id="id"
              onChange={handleChange} value={form.cliente_id} className='inputsi w-id m-r'/>

              <label htmlFor="id2">Cédula: </label> 
              <input type="number" name="cliente_cedula" id="id2"
              onChange={handleChange} value={form.cliente_cedula} className='inputsi m-r'/>

              <label htmlFor="id3">Nombres: </label> 
              <input type="text" name="cliente_nombre" id="id3"
              onChange={handleChange} value={form.cliente_nombre} className='inputsi m-r'/>

              <label htmlFor="id4">Apellidos: </label> 
              <input type="text" name="cliente_apellido" id="id4"
              onChange={handleChange} value={form.cliente_apellido} className='inputsi m-r'/>
              <div className='top-10'>
              <label htmlFor="cantidad">Correo: </label>
              <input type="email" name="cliente_correo" id="cantidad"
              onChange={handleChange} value={form.cliente_correo} className='inputsi m-r'/>

              <label htmlFor="cantidad4">Fecha nacimiento: </label>
              <input type="date" name="cliente_fechanacimiento" id="cantidad4"
              onChange={handleChange} value={form.cliente_fechanacimiento} className='inputsi m-r'/>

              <label htmlFor="cantidad2">Teléfono: </label>
              <input type="number" name="cliente_telefono" id="cantidad2"
              onChange={handleChange} value={form.cliente_telefono} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h3 className='subtitulo'>Listado de clientes</h3>
          <table className='c-table'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Fecha de nacimiento</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((c) => {
              return(
                <tr key={c.cliente_id}>
                  <td>{c.cliente_id}</td>
                  <td>{c.cliente_cedula}</td>
                  <td>{c.cliente_nombre}</td>
                  <td>{c.cliente_apellido}</td>
                  <td>{c.cliente_correo}</td>
                  <td>{c.cliente_fechanacimiento.substring(0, 10)}</td>
                  <td>{c.cliente_telefono}</td>
                  <td>
                      <button className='buttona mr-5'
                        onClick={() => {
                          c.cliente_fechanacimiento = c.cliente_fechanacimiento.substring(0, 10)
                          setForm(c)
                        }}
                      >Editar</button>

                      <button className='buttone'
                        onClick={ async () => {
                          const res = await deleteCliente(c.cliente_id)
                          alert(res.mensaje)
                          setReload(!reload)
                        }}
                      >Eliminar</button>
                    </td>
                    
                </tr>
              )
            })
          }
          </tbody>
          </table>
        </div>
        
      </div>
    </>
  )
}