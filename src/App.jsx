import React, { useMemo, useState } from 'react';

const estaciones = [
  {
    id: 1,
    nombre: 'Estación Río Mapocho',
    region: 'Metropolitana',
    fuente: 'DGA',
    temperatura: 18.4,
    precipitacion: 4.2,
    caudal: 32.8,
    ultimaActualizacion: '14 mayo 2026 · 09:30',
    estadoDatos: 'Actualizado',
  },
  {
    id: 2,
    nombre: 'Estación Lago Llanquihue',
    region: 'Los Lagos',
    fuente: 'Universidad Austral',
    temperatura: 11.9,
    precipitacion: 18.6,
    caudal: 78.1,
    ultimaActualizacion: '14 mayo 2026 · 08:45',
    estadoDatos: 'Actualizado',
  },
  {
    id: 3,
    nombre: 'Estación Río Biobío',
    region: 'Biobío',
    fuente: 'DGA',
    temperatura: 14.7,
    precipitacion: 22.1,
    caudal: 126.4,
    ultimaActualizacion: '13 mayo 2026 · 18:10',
    estadoDatos: 'Desactualizado',
  },
  {
    id: 4,
    nombre: 'Estación Quebrada de Tarapacá',
    region: 'Tarapacá',
    fuente: 'Aguas del Norte',
    temperatura: 24.8,
    precipitacion: 0.4,
    caudal: 6.3,
    ultimaActualizacion: 'Sin registro reciente',
    estadoDatos: 'Sin datos',
  },
  {
    id: 5,
    nombre: 'Estación Río Elqui',
    region: 'Coquimbo',
    fuente: 'Centro CEAZA',
    temperatura: 20.2,
    precipitacion: 1.8,
    caudal: 14.7,
    ultimaActualizacion: '14 mayo 2026 · 07:55',
    estadoDatos: 'Actualizado',
  },
  {
    id: 6,
    nombre: 'Estación Río Baker',
    region: 'Aysén',
    fuente: 'Patagonia Data',
    temperatura: 8.5,
    precipitacion: 31.2,
    caudal: 214.9,
    ultimaActualizacion: '13 mayo 2026 · 12:20',
    estadoDatos: 'Desactualizado',
  },
  {
    id: 7,
    nombre: 'Estación Río Toltén',
    region: 'La Araucanía',
    fuente: 'Universidad de La Frontera',
    temperatura: 12.8,
    precipitacion: 27.5,
    caudal: 102.6,
    ultimaActualizacion: '14 mayo 2026 · 09:05',
    estadoDatos: 'Actualizado',
  },
  {
    id: 8,
    nombre: 'Estación Río Maipo',
    region: 'Metropolitana',
    fuente: 'DGA',
    temperatura: 17.1,
    precipitacion: 6.9,
    caudal: 44.2,
    ultimaActualizacion: 'Sin registro reciente',
    estadoDatos: 'Sin datos',
  },
];

const variablesDisponibles = ['Temperatura', 'Precipitaciones', 'Caudal'];
const estadoDatosOpciones = ['Actualizado', 'Desactualizado', 'Sin datos'];

const estadoDatosClases = {
  Actualizado: 'actualizado',
  Desactualizado: 'desactualizado',
  'Sin datos': 'sin-datos',
};

const valoresPorVariable = {
  Temperatura: (estacion) => `${estacion.temperatura}°C`,
  Precipitaciones: (estacion) => `${estacion.precipitacion} mm`,
  Caudal: (estacion) => `${estacion.caudal} m³/s`,
};

function App() {
  const [regionSeleccionada, setRegionSeleccionada] = useState('Todas');
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState('Todas');
  const [variableSeleccionada, setVariableSeleccionada] = useState('Todas');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');

  const regiones = useMemo(
    () => ['Todas', ...new Set(estaciones.map((estacion) => estacion.region))],
    [],
  );

  const fuentes = useMemo(
    () => ['Todas', ...new Set(estaciones.map((estacion) => estacion.fuente))],
    [],
  );

  const estacionesFiltradas = useMemo(
    () => estaciones.filter((estacion) => {
      const coincideRegion = regionSeleccionada === 'Todas' || estacion.region === regionSeleccionada;
      const coincideFuente = fuenteSeleccionada === 'Todas' || estacion.fuente === fuenteSeleccionada;
      const coincideEstado = estadoSeleccionado === 'Todos' || estacion.estadoDatos === estadoSeleccionado;

      return coincideRegion && coincideFuente && coincideEstado;
    }),
    [regionSeleccionada, fuenteSeleccionada, estadoSeleccionado],
  );

  const metricas = useMemo(() => {
    const fuentesIntegradas = new Set(estaciones.map((estacion) => estacion.fuente)).size;

    return {
      totalEstaciones: estaciones.length,
      fuentesIntegradas,
      variablesDisponibles: variablesDisponibles.length,
      ultimaActualizacionGeneral: '14 mayo 2026 · 09:30',
    };
  }, []);

  return (
    <main className="dashboard">
      <section className="hero">
        <div>
          <span className="eyebrow">MVP HidrometeorologíaChile</span>
          <h1>Consulta unificada de datos hidrometeorológicos</h1>
          <p>
            Plataforma demostrativa para centralizar información de distintas fuentes, consultar estaciones y variables, filtrar datos y comparar mediciones sin revisar múltiples plataformas por separado.
          </p>
        </div>
        <div className="hero-card">
          <span>Datos simulados integrados</span>
          <strong>{metricas.totalEstaciones}</strong>
          <small>estaciones disponibles para consulta</small>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Resumen general">
        <article className="metric-card stations">
          <span>Total de estaciones disponibles</span>
          <strong>{metricas.totalEstaciones}</strong>
        </article>
        <article className="metric-card sources">
          <span>Fuentes integradas</span>
          <strong>{metricas.fuentesIntegradas}</strong>
        </article>
        <article className="metric-card variables">
          <span>Variables disponibles</span>
          <strong>{metricas.variablesDisponibles}</strong>
        </article>
        <article className="metric-card updated">
          <span>Última actualización general</span>
          <strong>{metricas.ultimaActualizacionGeneral}</strong>
        </article>
      </section>

      <section className="filters-panel">
        <div>
          <h2>Explorar estaciones y variables</h2>
          <p>Filtra por región, fuente de datos, variable hidrometeorológica y estado de datos para revisar la información simulada.</p>
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
            Fuente de datos
            <select value={fuenteSeleccionada} onChange={(event) => setFuenteSeleccionada(event.target.value)}>
              {fuentes.map((fuente) => (
                <option key={fuente} value={fuente}>{fuente}</option>
              ))}
            </select>
          </label>
          <label>
            Variable hidrometeorológica
            <select value={variableSeleccionada} onChange={(event) => setVariableSeleccionada(event.target.value)}>
              <option value="Todas">Todas</option>
              {variablesDisponibles.map((variable) => (
                <option key={variable} value={variable}>{variable}</option>
              ))}
            </select>
          </label>
          <label>
            Estado de datos
            <select value={estadoSeleccionado} onChange={(event) => setEstadoSeleccionado(event.target.value)}>
              <option value="Todos">Todos</option>
              {estadoDatosOpciones.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
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
                <small>{estacion.fuente}</small>
              </div>
              <span className={`status ${estadoDatosClases[estacion.estadoDatos]}`}>{estacion.estadoDatos}</span>
            </div>
            <div className="station-values">
              {(variableSeleccionada === 'Todas' ? variablesDisponibles : [variableSeleccionada]).map((variable) => (
                <div key={`${estacion.id}-${variable}`}>
                  <span>{variable}</span>
                  <strong>{valoresPorVariable[variable](estacion)}</strong>
                </div>
              ))}
            </div>
            <p className="last-update">Última actualización: {estacion.ultimaActualizacion}</p>
          </article>
        ))}
      </section>

      <section className="comparison-panel">
        <div className="section-title">
          <h2>Comparación de estaciones y variables</h2>
          <p>Tabla para comparar estaciones, fuentes y variables hidrometeorológicas usando los filtros seleccionados.</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Estación</th>
                <th>Región</th>
                <th>Fuente</th>
                <th>Temperatura</th>
                <th>Precipitaciones</th>
                <th>Caudal</th>
                <th>Última actualización</th>
              </tr>
            </thead>
            <tbody>
              {estacionesFiltradas.map((estacion) => (
                <tr key={`fila-${estacion.id}`}>
                  <td>{estacion.nombre}</td>
                  <td>{estacion.region}</td>
                  <td>{estacion.fuente}</td>
                  <td>{estacion.temperatura}°C</td>
                  <td>{estacion.precipitacion} mm</td>
                  <td>{estacion.caudal} m³/s</td>
                  <td>{estacion.ultimaActualizacion}</td>
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
