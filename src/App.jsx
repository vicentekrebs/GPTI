import { Navigate, Route, Routes } from './lib/reactRouterDom.js';
import Navbar from './components/Navbar.jsx';
import Comparacion from './pages/Comparacion.jsx';
import Estaciones from './pages/Estaciones.jsx';
import Inicio from './pages/Inicio.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className="dashboard">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/estaciones" element={<Estaciones />} />
          <Route path="/comparacion" element={<Comparacion />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
