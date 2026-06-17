import { NavLink } from '../lib/reactRouterDom.js';

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">HidrometeorologíaChile</NavLink>
      <nav aria-label="Navegación principal">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/estaciones">Estaciones</NavLink>
        <NavLink to="/comparacion">Comparación</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
