import { useState, useEffect } from 'react'
import leerRevision from '../peticiones/revisiones/leerRevision'
import leerTransacciones from '../peticiones/revisiones/leerTransaccionesRevision'
import actualizarRevisiones from '../peticiones/revisiones/actualizarRevisiones'

const datos = {
  moto_id: '',
  revisionmoto_pagado: '',
  reporterevision_danios: ''
}

export default function Revisiones(){
  const [dataEstado, setDataEstado] = useState([])
  const [dataTransacciones, setDataTransacciones] = useState([])
  const [reload, setReload] = useState(false)
  const [form, setForm] = useState(datos)

  const enviarFormulario = async () =>{
    const respuesta = await actualizarRevisiones(form)
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

    if (!form.moto_id || !form.revisionmoto_pagado || !form.reporterevision_danios) {
      alert('Datos incompletos')
      return
    }else{
      enviarFormulario()
    }
  }

  useEffect(function(){
    leerRevision().then(r => setDataEstado(r))
    leerTransacciones().then(t => setDataTransacciones(t))
  }, [reload])

  return(
    <>
    <h1 className='titulo'>Transacción de Revisiones</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="moto_id" id="id"
              onChange={handleChange} value={form.moto_id} className='inputsi w-id m-r'/>

              <label htmlFor="id2">Pago de la revisión: </label> 
              <input type="number" name="revisionmoto_pagado" id="id2"
              onChange={handleChange} value={form.revisionmoto_pagado} className='inputsi m-r'/>

              <label htmlFor="id3">Incidente de la revisión: </label> 
              <input type="text" name="reporterevision_danios" id="id3"
              onChange={handleChange} value={form.reporterevision_danios} className='inputsi m-r'/>

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
                <th>Placa</th>
                <th>Reparación</th>
                {/* <th>Id Revisión</th> */}
                <th>Fecha</th>
                <th>Costo</th>
                <th>Pagado</th>
                <th>Estado</th>
                {/* <th>Id Reporte</th> */}
                <th>Daños</th>
              </tr>
            </thead>
            <tbody>
            {
              dataTransacciones.map((t) => {
                return(
                  <tr key={t.moto_id}>
                    <td>{t.moto_id}</td>
                    <td>{t.moto_placa}</td>
                    <td>{t.moto_reparacion}</td>
                    {/* <td>{t.revisionmoto_id}</td> */}
                    <td>{t.revisionmoto_fecha.slice(0, 10)}</td>
                    <td>{t.revisionmoto_costo}</td>
                    <td>{t.revisionmoto_pagado}</td>
                    <td>{t.revisionmoto_estado}</td>
                    {/* <td>{t.reporterevision_id}</td> */}
                    <td>{t.reporterevision_danios}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div>
          <h2 className='subtitulo'>Estado revisiones</h2>
          <table className='c-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Costo</th>
                <th>Pagado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {
              dataEstado.map((e) => {
                return(
                  <tr key={e.revisionmoto_id}>
                    <td>{e.revisionmoto_id}</td>
                    <td>{e.revisionmoto_costo}</td>
                    <td>{e.revisionmoto_pagado}</td>
                    <td>{e.revisionmoto_estado}</td>
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