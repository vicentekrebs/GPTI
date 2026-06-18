import { NavLink } from '../lib/reactRouterDom.js';

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">HidrometeorologíaChile</NavLink>
      <nav aria-label="Navegación principal">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/fuentes">Nuestras fuentes</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
