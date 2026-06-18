import { useMemo, useState } from 'react';
import { estaciones } from '../data/hydroData.js';

function Estaciones() {
  const [zona, setZona] = useState('Todas');

  const zonas = useMemo(() => ['Todas', ...new Set(estaciones.map((estacion) => estacion.zona))], []);

  const estacionesFiltradas = useMemo(
    () => estaciones.filter((estacion) => zona === 'Todas' || estacion.zona === zona),
    [zona],
  );

  return (
    <div className="page-stack">
      <section className="page-heading">
        <h1>Estaciones disponibles</h1>
        <p>Consulta las estaciones hidrometeorológicas disponibles según la zona o lugar seleccionado.</p>
      </section>

      <section className="filters-panel" aria-label="Filtro de lugar o zona">
        <div>
          <h2>Lugar / zona</h2>
        </div>
        <div className="filters">
          <label>
            Lugar / zona
            <select value={zona} onChange={(event) => setZona(event.target.value)}>
              {zonas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="stations-grid" aria-label="Listado de estaciones disponibles">
        {estacionesFiltradas.length > 0 ? (
          estacionesFiltradas.map((estacion) => (
            <article className="station-card" key={estacion.id}>
              <h3>{estacion.nombre}</h3>
              <dl className="station-details">
                <div>
                  <dt>Zona</dt>
                  <dd>{estacion.zona}</dd>
                </div>
                <div>
                  <dt>Región</dt>
                  <dd>{estacion.region}</dd>
                </div>
                <div>
                  <dt>Fuente</dt>
                  <dd>{estacion.fuente}</dd>
                </div>
              </dl>
            </article>
          ))
        ) : (
          <article className="station-card">
            <p className="last-update">No hay estaciones disponibles para el lugar seleccionado.</p>
          </article>
        )}
      </section>
    </div>
  );
}

export default Estaciones;
