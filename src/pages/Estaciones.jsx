import { useMemo, useState } from 'react';
import { estaciones, fuentesIntegradas, variablesDisponibles } from '../data/hydroData.js';

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

      <section className="sources-status-panel" aria-label="Estado de fuentes integradas">
        <div>
          <h2>Estado de fuentes integradas</h2>
          <p>Disponibilidad simulada de las fuentes utilizadas por la plataforma.</p>
        </div>
        <div className="sources-status-list">
          {fuentesIntegradas.map((fuente) => (
            <div className={`source-status ${fuente.disponible ? 'available' : 'unavailable'}`} key={fuente.nombre}>
              <span>{fuente.disponible ? '🟢' : '🔴'} {fuente.nombre}</span>
              <strong>{fuente.disponible ? 'Disponible' : 'No disponible'}</strong>
              {!fuente.disponible && (
                <small>Actualmente esta fuente no se encuentra disponible. La plataforma continúa operando con las demás fuentes.</small>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="stations-grid" aria-label="Listado de estaciones disponibles">
        {estacionesFiltradas.length > 0 ? (
          estacionesFiltradas.map((estacion) => (
            <article className="station-card" key={estacion.id}>
              <div className="station-header">
                <div>
                  <h3>{estacion.nombre}</h3>
                  <span>{estacion.zona}</span>
                  <small>{estacion.region}</small>
                </div>
              </div>
              <div className="station-variables" aria-label={`Variables disponibles en ${estacion.nombre}`}>
                <h4>Variables disponibles</h4>
                <ul>
                  {variablesDisponibles.map((variable) => {
                    const disponible = estacion.variablesMonitoreadas.includes(variable);
                    return (
                      <li className={disponible ? 'available' : 'unavailable'} key={variable}>
                        <span aria-hidden="true">{disponible ? '✓' : '✗'}</span>
                        {variable}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="last-update">Fuente: {estacion.fuente}</p>
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
