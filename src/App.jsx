import { Navigate, Route, Routes } from './lib/reactRouterDom.js';
import Navbar from './components/Navbar.jsx';
import Comparacion from './pages/Comparacion.jsx';
import Estaciones from './pages/Estaciones.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className="dashboard">
        <Routes>
          <Route path="/" element={<Comparacion />} />
          <Route path="/fuentes" element={<Estaciones />} />
          <Route path="/estaciones" element={<Navigate to="/fuentes" replace />} />
          <Route path="/comparacion" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
