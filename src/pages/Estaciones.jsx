import { useMemo, useState } from 'react';
import { estaciones } from '../data/hydroData.js';

const opcionTodas = 'Todas';

function normalizarClase(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
}

function obtenerOpciones(campo) {
  return [opcionTodas, ...new Set(estaciones.map((estacion) => estacion[campo]))];
}

function agruparPorZona(estacionesFiltradas) {
  return estacionesFiltradas.reduce((grupos, estacion) => {
    const estacionesZona = grupos.get(estacion.zona) ?? [];
    estacionesZona.push(estacion);
    grupos.set(estacion.zona, estacionesZona);
    return grupos;
  }, new Map());
}

function Estaciones() {
  const [zona, setZona] = useState(opcionTodas);
  const [fuente, setFuente] = useState(opcionTodas);
  const [estado, setEstado] = useState(opcionTodas);

  const zonas = useMemo(() => obtenerOpciones('zona'), []);
  const fuentes = useMemo(() => obtenerOpciones('fuente'), []);
  const estados = useMemo(() => obtenerOpciones('estadoDatos'), []);

  const estacionesFiltradas = useMemo(
    () => estaciones.filter((estacion) => (
      (zona === opcionTodas || estacion.zona === zona)
      && (fuente === opcionTodas || estacion.fuente === fuente)
      && (estado === opcionTodas || estacion.estadoDatos === estado)
    )),
    [estado, fuente, zona],
  );

  const estacionesPorZona = useMemo(() => agruparPorZona(estacionesFiltradas), [estacionesFiltradas]);

  return (
    <div className="page-stack sources-page">
      <section className="page-heading">
        <span className="eyebrow">Transparencia de datos</span>
        <h1>Nuestras fuentes</h1>
        <p>
          Revisa las estaciones y fuentes con las que trabaja la plataforma. Esta vista transparenta
          dónde opera cada estación, qué institución entrega los datos, qué variables monitorea y
          qué tan actualizada está la información disponible.
        </p>
      </section>

      <section className="filters-panel" aria-label="Filtros de fuentes y estaciones">
        <div>
          <h2>Filtrar estaciones</h2>
          <p>Organiza el inventario por zona, fuente institucional o estado del dato.</p>
        </div>
        <div className="filters">
          <label>
            Zona / cuenca
            <select value={zona} onChange={(event) => setZona(event.target.value)}>
              {zonas.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Fuente
            <select value={fuente} onChange={(event) => setFuente(event.target.value)}>
              {fuentes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Estado del dato
            <select value={estado} onChange={(event) => setEstado(event.target.value)}>
              {estados.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      {estacionesFiltradas.length > 0 ? (
        Array.from(estacionesPorZona.entries()).map(([nombreZona, estacionesZona]) => (
          <section className="source-zone-group" key={nombreZona} aria-labelledby={`zona-${normalizarClase(nombreZona)}`}>
            <div className="source-zone-heading">
              <div>
                <span className="eyebrow compact">Zona / cuenca</span>
                <h2 id={`zona-${normalizarClase(nombreZona)}`}>{nombreZona}</h2>
              </div>
              <strong>{estacionesZona.length} fuente{estacionesZona.length === 1 ? '' : 's'}</strong>
            </div>

            <div className="stations-grid" aria-label={`Estaciones en ${nombreZona}`}>
              {estacionesZona.map((estacion) => (
                <article className="station-card source-card" key={estacion.id}>
                  <div className="station-card-header">
                    <h3>{estacion.nombre}</h3>
                    <span className={`status ${normalizarClase(estacion.estadoDatos)}`}>{estacion.estadoDatos}</span>
                  </div>
                  <dl className="station-details source-details">
                    <div><dt>Zona</dt><dd>{estacion.zona}</dd></div>
                    <div><dt>Lugar</dt><dd>{estacion.region}</dd></div>
                    <div><dt>Fuente</dt><dd>{estacion.fuente}</dd></div>
                    <div><dt>Variables</dt><dd>{estacion.variablesMonitoreadas.join(', ')}</dd></div>
                    <div><dt>Actualización</dt><dd><span className="update-date">{estacion.ultimaActualizacionExacta}</span><span className="update-relative">{estacion.ultimaActualizacion}</span></dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))
      ) : (
        <article className="station-card">
          <p className="last-update">No hay fuentes que coincidan con los filtros seleccionados.</p>
        </article>
      )}
    </div>
  );
}

export default Estaciones;
