import { Link } from "wouter"
import './Navegacion.css'

export default function Navegacion() {
  return (
    <>
    <header className="top-bar">
      <nav>
        <ul className="ul">
          <li className="item">
            <Link href="/" className="link">Entregas</Link>
          </li>
          <li className="item">
            <Link href="/revisiones" className="link">Revisiones</Link>
          </li>
          <li className="item">
            <Link href="/clientes" className="link">Clientes</Link>
          </li>
          <li className="item">
            <Link href="/empresas" className="link">Empresas</Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}