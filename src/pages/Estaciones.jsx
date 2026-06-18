import { useMemo, useState } from 'react';
import { estaciones } from '../data/hydroData.js';

function normalizarClase(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
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
  const regiones = useMemo(
    () => Array.from(agruparPorCampo(estaciones, 'region').entries()).map(([region, estacionesDeRegion]) => ({
      region,
      zonas: Array.from(agruparPorCampo(estacionesDeRegion, 'zona').entries()).map(([zona, estacionesZona]) => ({
        zona,
        estaciones: estacionesZona,
      })),
    })),
    [],
  );

  const [regionSeleccionada, setRegionSeleccionada] = useState(null);
  const [zonasAbiertas, setZonasAbiertas] = useState(() => new Set());

  const seleccionarRegion = (region) => {
    setRegionSeleccionada((regionActual) => {
      const siguienteRegion = regionActual === region ? null : region;
      setZonasAbiertas(new Set());
      return siguienteRegion;
    });
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

      <section className="region-selector-panel simple-source-list" aria-label="Regiones cubiertas por la aplicación">
        <div className="source-accordion-list" role="list">
          {regiones.map(({ region, zonas }) => {
            const regionAbierta = regionSeleccionada === region;
            const regionId = `region-${normalizarClase(region)}`;

            return (
              <article className="source-region-group" key={region} role="listitem">
                <button
                  className="region-card"
                  type="button"
                  onClick={() => seleccionarRegion(region)}
                  aria-expanded={regionAbierta}
                  aria-controls={`${regionId}-zonas`}
                >
                  <span>
                    <strong>{region}</strong>
                    <small>{zonas.length} zona{zonas.length === 1 ? '' : 's'} / cuenca{zonas.length === 1 ? '' : 's'}</small>
                  </span>
                  <span className="accordion-icon" aria-hidden="true">{regionAbierta ? '−' : '+'}</span>
                </button>

                {regionAbierta && (
                  <div className="source-zones-list" id={`${regionId}-zonas`} aria-label={`Zonas y cuencas en ${region}`}>
                    {zonas.map(({ zona: nombreZona, estaciones: estacionesZona }) => {
                      const zonaAbierta = zonasAbiertas.has(nombreZona);
                      const zonaId = `${regionId}-zona-${normalizarClase(nombreZona)}`;

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
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Estaciones;
