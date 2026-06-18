import { useMemo, useState } from 'react';
import { estaciones } from '../data/hydroData.js';

const opcionTodas = 'Todas';

function normalizarClase(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
}

function obtenerOpciones(campo, lista = estaciones) {
  return [opcionTodas, ...new Set(lista.map((estacion) => estacion[campo]))];
}

function agruparPorCampo(lista, campo) {
  return lista.reduce((grupos, estacion) => {
    const llave = estacion[campo];
    const estacionesGrupo = grupos.get(llave) ?? [];
    estacionesGrupo.push(estacion);
    grupos.set(llave, estacionesGrupo);
    return grupos;
  }, new Map());
}

function Estaciones() {
  const regiones = useMemo(() => Array.from(new Set(estaciones.map((estacion) => estacion.region))), []);
  const [regionSeleccionada, setRegionSeleccionada] = useState(regiones[0]);
  const [fuente, setFuente] = useState(opcionTodas);
  const [estado, setEstado] = useState(opcionTodas);
  const [zonasAbiertas, setZonasAbiertas] = useState(() => new Set());

  const estacionesRegion = useMemo(
    () => estaciones.filter((estacion) => estacion.region === regionSeleccionada),
    [regionSeleccionada],
  );

  const fuentes = useMemo(() => obtenerOpciones('fuente', estacionesRegion), [estacionesRegion]);
  const estados = useMemo(() => obtenerOpciones('estadoDatos', estacionesRegion), [estacionesRegion]);

  const estacionesFiltradas = useMemo(
    () => estacionesRegion.filter((estacion) => (
      (fuente === opcionTodas || estacion.fuente === fuente)
      && (estado === opcionTodas || estacion.estadoDatos === estado)
    )),
    [estado, estacionesRegion, fuente],
  );

  const estacionesPorZona = useMemo(
    () => agruparPorCampo(estacionesFiltradas, 'zona'),
    [estacionesFiltradas],
  );

  const estadisticasRegiones = useMemo(
    () => Array.from(agruparPorCampo(estaciones, 'region').entries()).map(([region, estacionesDeRegion]) => ({
      region,
      estaciones: estacionesDeRegion.length,
      zonas: new Set(estacionesDeRegion.map((estacion) => estacion.zona)).size,
    })),
    [],
  );

  const seleccionarRegion = (region) => {
    setRegionSeleccionada(region);
    setFuente(opcionTodas);
    setEstado(opcionTodas);
    setZonasAbiertas(new Set());
  };

  const alternarZona = (nombreZona) => {
    setZonasAbiertas((zonasActuales) => {
      const siguientesZonas = new Set(zonasActuales);
      if (siguientesZonas.has(nombreZona)) {
        siguientesZonas.delete(nombreZona);
      } else {
        siguientesZonas.add(nombreZona);
      }
      return siguientesZonas;
    });
  };

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

      <section className="region-selector-panel" aria-label="Regiones cubiertas por la aplicación">
        <div className="section-title">
          <span className="eyebrow compact">Cobertura regional</span>
          <h2>Selecciona una región</h2>
          <p>La página muestra solo una región a la vez para facilitar la validación de zonas, fuentes y actualización de datos.</p>
        </div>
        <div className="region-card-row" role="list">
          {estadisticasRegiones.map(({ region, estaciones: totalEstaciones, zonas }) => (
            <button
              className={`region-card ${regionSeleccionada === region ? 'active' : ''}`}
              type="button"
              key={region}
              onClick={() => seleccionarRegion(region)}
              aria-pressed={regionSeleccionada === region}
            >
              <strong>{region}</strong>
              <span>{zonas} zona{zonas === 1 ? '' : 's'} / cuenca{zonas === 1 ? '' : 's'}</span>
              <small>{totalEstaciones} estación{totalEstaciones === 1 ? '' : 'es'}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="filters-panel" aria-label={`Filtros de fuentes y estaciones en ${regionSeleccionada}`}>
        <div>
          <h2>Filtrar en {regionSeleccionada}</h2>
          <p>Los filtros secundarios se aplican solo a la región seleccionada.</p>
        </div>
        <div className="filters">
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

      <section className="selected-region-summary" aria-label={`Resumen de ${regionSeleccionada}`}>
        <span className="eyebrow compact">Región seleccionada</span>
        <h2>{regionSeleccionada}</h2>
        <p>
          {estacionesFiltradas.length} estación{estacionesFiltradas.length === 1 ? '' : 'es'} visible{estacionesFiltradas.length === 1 ? '' : 's'} en{' '}
          {estacionesPorZona.size} zona{estacionesPorZona.size === 1 ? '' : 's'} / cuenca{estacionesPorZona.size === 1 ? '' : 's'}.
        </p>
      </section>

      {estacionesFiltradas.length > 0 ? (
        <div className="source-accordion-list">
          {Array.from(estacionesPorZona.entries()).map(([nombreZona, estacionesZona]) => {
            const zonaAbierta = zonasAbiertas.has(nombreZona);
            const zonaId = `zona-${normalizarClase(regionSeleccionada)}-${normalizarClase(nombreZona)}`;

            return (
              <section className="source-zone-group" key={nombreZona} aria-labelledby={`${zonaId}-titulo`}>
                <button
                  className="source-zone-heading"
                  type="button"
                  onClick={() => alternarZona(nombreZona)}
                  aria-expanded={zonaAbierta}
                  aria-controls={`${zonaId}-contenido`}
                >
                  <span>
                    <span className="eyebrow compact">Zona / cuenca</span>
                    <h2 id={`${zonaId}-titulo`}>{nombreZona}</h2>
                  </span>
                  <strong>{estacionesZona.length} estación{estacionesZona.length === 1 ? '' : 'es'}</strong>
                  <span className="accordion-icon" aria-hidden="true">{zonaAbierta ? '−' : '+'}</span>
                </button>

                {zonaAbierta && (
                  <div className="stations-grid compact" id={`${zonaId}-contenido`} aria-label={`Estaciones en ${nombreZona}`}>
                    {estacionesZona.map((estacion) => (
                      <article className="station-card source-card compact" key={estacion.id}>
                        <div className="station-card-header">
                          <h3>{estacion.nombre}</h3>
                          <span className={`status ${normalizarClase(estacion.estadoDatos)}`}>{estacion.estadoDatos}</span>
                        </div>
                        <dl className="station-details source-details compact">
                          <div><dt>Fuente</dt><dd>{estacion.fuente}</dd></div>
                          <div><dt>Variables</dt><dd>{estacion.variablesMonitoreadas.join(', ')}</dd></div>
                          <div><dt>Actualización</dt><dd><span className="update-date">{estacion.ultimaActualizacionExacta}</span><span className="update-relative">{estacion.ultimaActualizacion}</span></dd></div>
                        </dl>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <article className="station-card empty-state">
          <h3>Sin resultados en {regionSeleccionada}</h3>
          <p className="last-update">No hay estaciones que coincidan con la fuente y el estado del dato seleccionados para esta región.</p>
        </article>
      )}
    </div>
  );
}

export default Estaciones;
