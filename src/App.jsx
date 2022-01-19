import { Route } from 'wouter'
import Navegacion from './componentes/Navegacion'
import Entregas from './paginas/Entregas'
import Revisiones from './paginas/Revisiones'
import Clientes from './paginas/Clientes'
import Empresas from './paginas/Empresas'

function App() {

  return (
    <div>
      <Navegacion/>
      <div className='App'>
        <Route path='/' component={Entregas}/>
        <Route path='/revisiones' component={Revisiones}/>
        <Route path='/empresas' component={Empresas}/>
        <Route path='/clientes' component={Clientes}/>
      </div>
    </div>
  )
}

export default App