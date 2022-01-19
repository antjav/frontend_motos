import { useState, useEffect } from 'react'
import actualizarEmpresa from '../peticiones/empresas/actualizarEmpresa'
import eliminarEmpresa from '../peticiones/empresas/eliminarEmpresa'
import leerEmpresas from '../peticiones/empresas/leerEmpresas'

const datosIniciales = {
  empresa_id: '',
  empresa_nombre: '',
  empresa_direccion: '',
  empresa_ciudad: '',
  empresa_correo: '',
  empresa_telefono: ''
}

export default function Empresas() {
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

    if (!form.empresa_id|| !form.empresa_nombre|| !form.empresa_direccion|| !form.empresa_ciudad||
      !form.empresa_correo|| !form.empresa_telefono ) {
      alert('Datos incompletos')
      return
    }else{
      const actualizacion = async () => {
        const res = await actualizarEmpresa(form)
        alert(res.mensaje)
        setReload(!reload)
        setForm(datosIniciales)
      }
      actualizacion()
    }
  }

  useEffect(function(){
    leerEmpresas().then(v => setData(v))
  }, [reload])

  return (
    <>
      <div>
        <h1 className='titulo'>CRUD de Empresas</h1>
        <div>
          <h3 className='subtitulo'>Crea o actualiza una empresa</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="empresa_id" id="id"
              onChange={handleChange} value={form.empresa_id} className='inputsi w-id m-r'/>

              <label htmlFor="id2">Nombre: </label> 
              <input type="text" name="empresa_nombre" id="id2"
              onChange={handleChange} value={form.empresa_nombre} className='inputsi m-r'/>

              <label htmlFor="id3">Dirección: </label> 
              <input type="text" name="empresa_direccion" id="id3"
              onChange={handleChange} value={form.empresa_direccion} className='inputsi m-r'/>

              <label htmlFor="id4">Ciudad: </label> 
              <input type="text" name="empresa_ciudad" id="id4"
              onChange={handleChange} value={form.empresa_ciudad} className='inputsi m-r'/>
              <div className='top-10'>
              <label htmlFor="cantidad">Correo: </label>
              <input type="email" name="empresa_correo" id="cantidad"
              onChange={handleChange} value={form.empresa_correo} className='inputsi m-r'/>

              <label htmlFor="cantidad2">Teléfono: </label>
              <input type="number" name="empresa_telefono" id="cantidad2"
              onChange={handleChange} value={form.empresa_telefono} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h3 className='subtitulo'>Listado de empresas</h3>
          <table className='c-table'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((c) => {
              return(
                <tr key={c.empresa_id}>
                  <td>{c.empresa_id}</td>
                  <td>{c.empresa_nombre}</td>
                  <td>{c.empresa_direccion}</td>
                  <td>{c.empresa_ciudad}</td>
                  <td>{c.empresa_correo}</td>
                  <td>{c.empresa_telefono}</td>
                  <td>
                      <button className='buttona mr-5'
                        onClick={() => {
                          setForm(c)
                        }}
                      >Editar</button>

                      <button className='buttone'
                        onClick={ async () => {
                          const res = await eliminarEmpresa(c.empresa_id)
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