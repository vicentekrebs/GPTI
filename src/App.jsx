import React, { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const variablesDisponibles = ['Temperatura', 'Precipitaciones', 'Caudal'];

const configuracionVariables = {
  Temperatura: {
    key: 'temperatura',
    unidad: '°C',
    color: '#0ea5e9',
  },
  Precipitaciones: {
    key: 'precipitacion',
    unidad: 'mm',
    color: '#2563eb',
  },
  Caudal: {
    key: 'caudal',
    unidad: 'm³/s',
    color: '#14b8a6',
  },
};

const estaciones = [
  {
    id: 1,
    nombre: 'Estación Río Mapocho',
    region: 'Metropolitana',
    fuente: 'DGA',
    ultimaActualizacion: '14 mayo 2026 · 09:30',
    estadoDatos: 'Actualizado',
    serieTemporal: [
      { dia: '08 may', temperatura: 16.7, precipitacion: 1.2, caudal: 29.4 },
      { dia: '09 may', temperatura: 17.5, precipitacion: 0.8, caudal: 30.1 },
      { dia: '10 may', temperatura: 18.1, precipitacion: 2.4, caudal: 31.7 },
      { dia: '11 may', temperatura: 17.9, precipitacion: 3.1, caudal: 32.2 },
      { dia: '12 may', temperatura: 18.6, precipitacion: 2.8, caudal: 32.9 },
      { dia: '13 may', temperatura: 19.2, precipitacion: 4.6, caudal: 34.3 },
      { dia: '14 may', temperatura: 18.4, precipitacion: 4.2, caudal: 32.8 },
    ],
  },
  {
    id: 2,
    nombre: 'Estación Lago Llanquihue',
    region: 'Los Lagos',
    fuente: 'Universidad Austral',
    ultimaActualizacion: '14 mayo 2026 · 08:45',
    estadoDatos: 'Actualizado',
    serieTemporal: [
      { dia: '08 may', temperatura: 10.8, precipitacion: 14.5, caudal: 71.2 },
      { dia: '09 may', temperatura: 11.1, precipitacion: 16.8, caudal: 73.9 },
      { dia: '10 may', temperatura: 10.6, precipitacion: 21.4, caudal: 79.6 },
      { dia: '11 may', temperatura: 11.4, precipitacion: 19.2, caudal: 80.3 },
      { dia: '12 may', temperatura: 12.2, precipitacion: 17.7, caudal: 77.8 },
      { dia: '13 may', temperatura: 12.5, precipitacion: 20.1, caudal: 81.4 },
      { dia: '14 may', temperatura: 11.9, precipitacion: 18.6, caudal: 78.1 },
    ],
  },
  {
    id: 3,
    nombre: 'Estación Río Biobío',
    region: 'Biobío',
    fuente: 'DGA',
    ultimaActualizacion: '13 mayo 2026 · 18:10',
    estadoDatos: 'Desactualizado',
    serieTemporal: [
      { dia: '08 may', temperatura: 13.5, precipitacion: 18.3, caudal: 118.7 },
      { dia: '09 may', temperatura: 14.0, precipitacion: 20.4, caudal: 121.5 },
      { dia: '10 may', temperatura: 14.4, precipitacion: 23.7, caudal: 129.2 },
      { dia: '11 may', temperatura: 15.1, precipitacion: 24.9, caudal: 132.6 },
      { dia: '12 may', temperatura: 14.8, precipitacion: 21.6, caudal: 125.1 },
      { dia: '13 may', temperatura: 14.7, precipitacion: 22.1, caudal: 126.4 },
      { dia: '14 may', temperatura: 14.9, precipitacion: 21.3, caudal: 124.8 },
    ],
  },
  {
    id: 4,
    nombre: 'Estación Quebrada de Tarapacá',
    region: 'Tarapacá',
    fuente: 'Aguas del Norte',
    ultimaActualizacion: 'Sin registro reciente',
    estadoDatos: 'Sin datos',
    serieTemporal: [
      { dia: '08 may', temperatura: 23.2, precipitacion: 0.0, caudal: 5.8 },
      { dia: '09 may', temperatura: 23.8, precipitacion: 0.1, caudal: 5.9 },
      { dia: '10 may', temperatura: 24.1, precipitacion: 0.0, caudal: 6.0 },
      { dia: '11 may', temperatura: 24.5, precipitacion: 0.2, caudal: 6.1 },
      { dia: '12 may', temperatura: 25.1, precipitacion: 0.3, caudal: 6.2 },
      { dia: '13 may', temperatura: 25.4, precipitacion: 0.1, caudal: 6.4 },
      { dia: '14 may', temperatura: 24.8, precipitacion: 0.4, caudal: 6.3 },
    ],
  },
  {
    id: 5,
    nombre: 'Estación Río Elqui',
    region: 'Coquimbo',
    fuente: 'Centro CEAZA',
    ultimaActualizacion: '14 mayo 2026 · 07:55',
    estadoDatos: 'Actualizado',
    serieTemporal: [
      { dia: '08 may', temperatura: 18.9, precipitacion: 0.6, caudal: 12.9 },
      { dia: '09 may', temperatura: 19.4, precipitacion: 1.1, caudal: 13.3 },
      { dia: '10 may', temperatura: 20.0, precipitacion: 1.3, caudal: 14.0 },
      { dia: '11 may', temperatura: 20.7, precipitacion: 1.6, caudal: 14.5 },
      { dia: '12 may', temperatura: 21.1, precipitacion: 2.0, caudal: 15.1 },
      { dia: '13 may', temperatura: 20.6, precipitacion: 1.9, caudal: 14.9 },
      { dia: '14 may', temperatura: 20.2, precipitacion: 1.8, caudal: 14.7 },
    ],
  },
  {
    id: 6,
    nombre: 'Estación Río Baker',
    region: 'Aysén',
    fuente: 'Patagonia Data',
    ultimaActualizacion: '13 mayo 2026 · 12:20',
    estadoDatos: 'Desactualizado',
    serieTemporal: [
      { dia: '08 may', temperatura: 7.1, precipitacion: 25.4, caudal: 198.5 },
      { dia: '09 may', temperatura: 7.8, precipitacion: 27.9, caudal: 204.2 },
      { dia: '10 may', temperatura: 8.2, precipitacion: 29.8, caudal: 210.6 },
      { dia: '11 may', temperatura: 8.0, precipitacion: 32.7, caudal: 218.1 },
      { dia: '12 may', temperatura: 8.7, precipitacion: 34.2, caudal: 221.4 },
      { dia: '13 may', temperatura: 8.5, precipitacion: 31.2, caudal: 214.9 },
      { dia: '14 may', temperatura: 8.9, precipitacion: 30.5, caudal: 212.7 },
    ],
  },
  {
    id: 7,
    nombre: 'Estación Río Toltén',
    region: 'La Araucanía',
    fuente: 'Universidad de La Frontera',
    ultimaActualizacion: '14 mayo 2026 · 09:05',
    estadoDatos: 'Actualizado',
    serieTemporal: [
      { dia: '08 may', temperatura: 11.4, precipitacion: 22.5, caudal: 94.8 },
      { dia: '09 may', temperatura: 11.9, precipitacion: 24.7, caudal: 97.6 },
      { dia: '10 may', temperatura: 12.1, precipitacion: 26.9, caudal: 101.3 },
      { dia: '11 may', temperatura: 12.6, precipitacion: 28.4, caudal: 104.5 },
      { dia: '12 may', temperatura: 13.0, precipitacion: 29.1, caudal: 105.7 },
      { dia: '13 may', temperatura: 13.3, precipitacion: 27.9, caudal: 103.9 },
      { dia: '14 may', temperatura: 12.8, precipitacion: 27.5, caudal: 102.6 },
    ],
  },
  {
    id: 8,
    nombre: 'Estación Río Maipo',
    region: 'Metropolitana',
    fuente: 'DGA',
    ultimaActualizacion: 'Sin registro reciente',
    estadoDatos: 'Sin datos',
    serieTemporal: [
      { dia: '08 may', temperatura: 15.9, precipitacion: 4.8, caudal: 39.1 },
      { dia: '09 may', temperatura: 16.4, precipitacion: 5.2, caudal: 40.3 },
      { dia: '10 may', temperatura: 16.8, precipitacion: 6.0, caudal: 42.7 },
      { dia: '11 may', temperatura: 17.4, precipitacion: 6.5, caudal: 43.8 },
      { dia: '12 may', temperatura: 17.9, precipitacion: 7.2, caudal: 45.1 },
      { dia: '13 may', temperatura: 17.5, precipitacion: 7.0, caudal: 44.6 },
      { dia: '14 may', temperatura: 17.1, precipitacion: 6.9, caudal: 44.2 },
    ],
  },
];

const estadoDatosOpciones = ['Actualizado', 'Desactualizado', 'Sin datos'];

const estadoDatosClases = {
  Actualizado: 'actualizado',
  Desactualizado: 'desactualizado',
  'Sin datos': 'sin-datos',
};

const obtenerValorActual = (estacion, variable) => {
  const ultimoRegistro = estacion.serieTemporal[estacion.serieTemporal.length - 1];
  const configuracion = configuracionVariables[variable];

  return `${ultimoRegistro[configuracion.key]} ${configuracion.unidad}`;
};

function App() {
  const [regionSeleccionada, setRegionSeleccionada] = useState('Todas');
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState('Todas');
  const [variableSeleccionada, setVariableSeleccionada] = useState('Todas');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [estacionGraficoId, setEstacionGraficoId] = useState(estaciones[0].id);
  const [variableGrafico, setVariableGrafico] = useState('Temperatura');

  const regiones = useMemo(
    () => ['Todas', ...new Set(estaciones.map((estacion) => estacion.region))],
    [],
  );

  const fuentes = useMemo(
    () => ['Todas', ...new Set(estaciones.map((estacion) => estacion.fuente))],
    [],
  );

  const estacionGrafico = useMemo(
    () => estaciones.find((estacion) => estacion.id === Number(estacionGraficoId)) ?? estaciones[0],
    [estacionGraficoId],
  );

  const configuracionGrafico = configuracionVariables[variableGrafico];

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

      <section className="chart-panel" aria-label="Gráfica temporal interactiva">
        <div className="chart-header">
          <div className="section-title">
            <span className="eyebrow compact">Serie temporal simulada</span>
            <h2>Visualización por estación y variable</h2>
            <p>
              Selecciona una estación y una variable para revisar su comportamiento diario durante la última semana disponible.
            </p>
          </div>
          <div className="chart-controls">
            <label>
              Estación
              <select value={estacionGraficoId} onChange={(event) => setEstacionGraficoId(event.target.value)}>
                {estaciones.map((estacion) => (
                  <option key={estacion.id} value={estacion.id}>{estacion.nombre}</option>
                ))}
              </select>
            </label>
            <label>
              Variable
              <select value={variableGrafico} onChange={(event) => setVariableGrafico(event.target.value)}>
                {variablesDisponibles.map((variable) => (
                  <option key={variable} value={variable}>{variable}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="chart-summary">
          <div>
            <span>Estación seleccionada</span>
            <strong>{estacionGrafico.nombre}</strong>
            <small>{estacionGrafico.region} · {estacionGrafico.fuente}</small>
          </div>
          <div>
            <span>Variable consultada</span>
            <strong>{variableGrafico}</strong>
            <small>Unidad: {configuracionGrafico.unidad}</small>
          </div>
          <div>
            <span>Último valor</span>
            <strong>{obtenerValorActual(estacionGrafico, variableGrafico)}</strong>
            <small>{estacionGrafico.ultimaActualizacion}</small>
          </div>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={estacionGrafico.serieTemporal} margin={{ top: 16, right: 24, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d9ecf7" />
              <XAxis dataKey="dia" tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#55708a', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(valor) => `${valor}`}
                label={{
                  value: `${variableGrafico} (${configuracionGrafico.unidad})`,
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#55708a',
                  fontSize: 12,
                }}
              />
              <Tooltip
                formatter={(valor) => [`${valor} ${configuracionGrafico.unidad}`, variableGrafico]}
                labelFormatter={(dia) => `Día: ${dia}`}
                contentStyle={{
                  border: '1px solid #c9e3f3',
                  borderRadius: '16px',
                  boxShadow: '0 16px 36px rgba(34, 84, 128, 0.16)',
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey={configuracionGrafico.key}
                name={variableGrafico}
                stroke={configuracionGrafico.color}
                strokeWidth={3}
                dot={{ r: 4, fill: '#fff', stroke: configuracionGrafico.color, strokeWidth: 2 }}
                activeDot={{ r: 7, fill: configuracionGrafico.color, stroke: '#fff', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
                  <strong>{obtenerValorActual(estacion, variable)}</strong>
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
                  <td>{obtenerValorActual(estacion, 'Temperatura')}</td>
                  <td>{obtenerValorActual(estacion, 'Precipitaciones')}</td>
                  <td>{obtenerValorActual(estacion, 'Caudal')}</td>
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
