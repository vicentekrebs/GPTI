import React, { useMemo, useState } from 'react';

const estaciones = [
  {
    id: 1,
    nombre: 'Estación Río Mapocho',
    region: 'Metropolitana',
    temperatura: 18.4,
    precipitacion: 4.2,
    caudal: 32.8,
    estado: 'normal',
  },
  {
    id: 2,
    nombre: 'Estación Lago Llanquihue',
    region: 'Los Lagos',
    temperatura: 11.9,
    precipitacion: 18.6,
    caudal: 78.1,
    estado: 'alerta',
  },
  {
    id: 3,
    nombre: 'Estación Río Biobío',
    region: 'Biobío',
    temperatura: 14.7,
    precipitacion: 22.1,
    caudal: 126.4,
    estado: 'crítico',
  },
  {
    id: 4,
    nombre: 'Estación Quebrada de Tarapacá',
    region: 'Tarapacá',
    temperatura: 24.8,
    precipitacion: 0.4,
    caudal: 6.3,
    estado: 'normal',
  },
  {
    id: 5,
    nombre: 'Estación Río Elqui',
    region: 'Coquimbo',
    temperatura: 20.2,
    precipitacion: 1.8,
    caudal: 14.7,
    estado: 'alerta',
  },
  {
    id: 6,
    nombre: 'Estación Río Baker',
    region: 'Aysén',
    temperatura: 8.5,
    precipitacion: 31.2,
    caudal: 214.9,
    estado: 'normal',
  },
  {
    id: 7,
    nombre: 'Estación Río Toltén',
    region: 'La Araucanía',
    temperatura: 12.8,
    precipitacion: 27.5,
    caudal: 102.6,
    estado: 'crítico',
  },
  {
    id: 8,
    nombre: 'Estación Río Maipo',
    region: 'Metropolitana',
    temperatura: 17.1,
    precipitacion: 6.9,
    caudal: 44.2,
    estado: 'normal',
  },
];

const estadoLabels = {
  normal: 'Normal',
  alerta: 'Alerta',
  crítico: 'Crítico',
};

function App() {
  const [regionSeleccionada, setRegionSeleccionada] = useState('Todas');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');

  const regiones = useMemo(
    () => ['Todas', ...new Set(estaciones.map((estacion) => estacion.region))],
    [],
  );

  const estacionesFiltradas = useMemo(
    () => estaciones.filter((estacion) => {
      const coincideRegion = regionSeleccionada === 'Todas' || estacion.region === regionSeleccionada;
      const coincideEstado = estadoSeleccionado === 'Todos' || estacion.estado === estadoSeleccionado;

      return coincideRegion && coincideEstado;
    }),
    [regionSeleccionada, estadoSeleccionado],
  );

  const metricas = useMemo(() => {
    const total = estaciones.length;
    const enAlerta = estaciones.filter((estacion) => estacion.estado === 'alerta').length;
    const criticas = estaciones.filter((estacion) => estacion.estado === 'crítico').length;
    const promedioTemperatura = estaciones.reduce(
      (suma, estacion) => suma + estacion.temperatura,
      0,
    ) / total;

    return {
      total,
      enAlerta,
      criticas,
      promedioTemperatura: promedioTemperatura.toFixed(1),
    };
  }, []);

  return (
    <main className="dashboard">
      <section className="hero">
        <div>
          <span className="eyebrow">Panel hidrometeorológico nacional</span>
          <h1>HidrometeorologíaChile</h1>
          <p>
            Plataforma web demostrativa para centralizar, consultar y comparar información climática e hídrica de estaciones distribuidas en Chile.
          </p>
        </div>
        <div className="hero-card">
          <span>Monitoreo simulado</span>
          <strong>{metricas.total}</strong>
          <small>estaciones conectadas</small>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Resumen general">
        <article className="metric-card">
          <span>Total estaciones</span>
          <strong>{metricas.total}</strong>
        </article>
        <article className="metric-card warning">
          <span>Estaciones en alerta</span>
          <strong>{metricas.enAlerta}</strong>
        </article>
        <article className="metric-card danger">
          <span>Estaciones críticas</span>
          <strong>{metricas.criticas}</strong>
        </article>
        <article className="metric-card temperature">
          <span>Promedio temperatura</span>
          <strong>{metricas.promedioTemperatura}°C</strong>
        </article>
      </section>

      <section className="filters-panel">
        <div>
          <h2>Explorar estaciones</h2>
          <p>Filtra por región y estado operacional para revisar las estaciones simuladas.</p>
        </div>
        <div className="filters">
          <label>
            Región
            <select value={regionSeleccionada} onChange={(event) => setRegionSeleccionada(event.target.value)}>
              {regiones.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </label>
          <label>
            Estado
            <select value={estadoSeleccionado} onChange={(event) => setEstadoSeleccionado(event.target.value)}>
              <option value="Todos">Todos</option>
              <option value="normal">Normal</option>
              <option value="alerta">Alerta</option>
              <option value="crítico">Crítico</option>
            </select>
          </label>
        </div>
      </section>

      <section className="stations-grid" aria-label="Tarjetas de estaciones">
        {estacionesFiltradas.map((estacion) => (
          <article className="station-card" key={estacion.id}>
            <div className="station-header">
              <div>
                <h3>{estacion.nombre}</h3>
                <span>{estacion.region}</span>
              </div>
              <span className={`status ${estacion.estado}`}>{estadoLabels[estacion.estado]}</span>
            </div>
            <div className="station-values">
              <div>
                <span>Temperatura</span>
                <strong>{estacion.temperatura}°C</strong>
              </div>
              <div>
                <span>Precipitación</span>
                <strong>{estacion.precipitacion} mm</strong>
              </div>
              <div>
                <span>Caudal</span>
                <strong>{estacion.caudal} m³/s</strong>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="comparison-panel">
        <div className="section-title">
          <h2>Comparación de estaciones</h2>
          <p>Vista resumida para comparar variables hidrometeorológicas clave.</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Estación</th>
                <th>Región</th>
                <th>Temp.</th>
                <th>Precip.</th>
                <th>Caudal</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {estacionesFiltradas.map((estacion) => (
                <tr key={`fila-${estacion.id}`}>
                  <td>{estacion.nombre}</td>
                  <td>{estacion.region}</td>
                  <td>{estacion.temperatura}°C</td>
                  <td>{estacion.precipitacion} mm</td>
                  <td>{estacion.caudal} m³/s</td>
                  <td><span className={`status ${estacion.estado}`}>{estadoLabels[estacion.estado]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
