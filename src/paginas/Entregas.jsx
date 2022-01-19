import { useState, useEffect } from 'react'
import leerEstado from '../peticiones/entregas/leerEstadoEntregas'
import leerTransacciones from '../peticiones/entregas/leerTransaccionesEntregas'
import actualizarEntregas from '../peticiones/entregas/actualizarEntregas'

const datos = {
  entrega_id: '',
  entrega_pagado: '',
  entregareporte_incidente: ''
}

export default function Entregas(){
  const [dataEstado, setDataEstado] = useState([])
  const [dataTransacciones, setDataTransacciones] = useState([])
  const [reload, setReload] = useState(false)
  const [form, setForm] = useState(datos)

  const enviarFormulario = async () =>{
    const respuesta = await actualizarEntregas(form)
    alert(respuesta.mensaje)
    setReload(!reload)
    setForm(datos)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.entrega_id || !form.entrega_pagado || !form.entregareporte_incidente) {
      alert('Datos incompletos')
      return
    }else{
      enviarFormulario()
    }
  }

  useEffect(function(){
    leerEstado().then(e => setDataEstado(e))
    leerTransacciones().then(t => setDataTransacciones(t))
  }, [reload])

  return(
    <>
    <h1 className='titulo'>Transacción de Entregas</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="entrega_id" id="id"
              onChange={handleChange} value={form.entrega_id} className='inputsi w-id m-r'/>

              <label htmlFor="id2">Pago de la entrega: </label> 
              <input type="number" name="entrega_pagado" id="id2"
              onChange={handleChange} value={form.entrega_pagado} className='inputsi m-r'/>

              <label htmlFor="id3">Incidente de la entrega: </label> 
              <input type="text" name="entregareporte_incidente" id="id3"
              onChange={handleChange} value={form.entregareporte_incidente} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>
          </div>
        </form>

      </div>
      <div className='flex-entregas'>
        <div>
          <h2 className='subtitulo'>Datos transaccionales</h2>
          <table className='c-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Pagado</th>
                {/* <th>Id</th> */}
                <th>Estado</th>
                {/* <th>Id</th> */}
                <th>Incidente</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
            {
              dataTransacciones.map((t) => {
                return(
                  <tr key={t.entrega_id}>
                    <td>{t.entrega_id}</td>
                    <td>{t.entrega_tipo}</td>
                    <td>{t.entrega_precio}</td>
                    <td>{t.entrega_pagado}</td>
                    {/* <td>{t.entregaestado_id}</td> */}
                    <td>{t.entregaestado_estado}</td>
                    {/* <td>{t.entregareporte_id}</td> */}
                    <td>{t.entregareporte_incidente}</td>
                    <td>{t.entregareporte_fecha.slice(0, 10)}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div>
          <h2 className='subtitulo'>Estado entregas</h2>
          <table className='c-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Pagado</th>
              </tr>
            </thead>
            <tbody>
            {
              dataEstado.map((e) => {
                return(
                  <tr key={e.entrega_id}>
                    <td>{e.entrega_id}</td>
                    <td>{e.entrega_tipo}</td>
                    <td>{e.entrega_precio}</td>
                    <td>{e.entrega_pagado}</td>
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