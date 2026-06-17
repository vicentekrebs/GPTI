import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { configuracionVariables, estaciones, variablesDisponibles, zonasComparacion } from '../data/hydroData.js';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const horasDia = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const coloresEstaciones = ['#0ea5e9', '#f97316', '#14b8a6', '#8b5cf6', '#ef4444'];

const variacionesPorVariable = {
  temperatura: [-2.1, -1.5, -0.7, 0.2, 1.1, 1.8, 2.4, 2, 1.3, 0.4, -0.5],
  precipitacion: [0.2, 0.4, 0.7, 1, 1.4, 1.2, 0.9, 0.6, 0.4, 0.3, 0.1],
  caudal: [-1.8, -1.1, -0.6, 0.1, 0.8, 1.3, 1.7, 1.4, 0.9, 0.3, -0.2],
};

const ajustePorDia = {
  Lunes: -0.3,
  Martes: 0.1,
  Miércoles: 0.6,
  Jueves: 0.3,
  Viernes: 0.8,
  Sábado: -0.1,
  Domingo: -0.5,
};

function construirNombreEstacion(estacion) {
  if (estacion.fuente === 'DGA') return `DGA ${estacion.nombre.replace('Estación ', '')}`;
  if (estacion.fuente.includes('Universidad de Chile')) return `Universidad de Chile ${estacion.nombre.replace('Estación ', '')}`;
  if (estacion.fuente.includes('minera')) return 'Minera Norte';
  if (estacion.fuente.includes('agrícola')) return `Agrícola ${estacion.nombre.replace('Elqui Agrícola ', '')}`;
  if (estacion.fuente.includes('turística')) return `Turismo ${estacion.nombre.replace('Operador Turístico ', '')}`;
  return estacion.nombre;
}

function obtenerValorHorario(estacion, key, indiceHora, dia) {
  const base = estacion[key];
  const ajusteEstacion = ((estacion.id % 3) - 1) * 0.45;
  const ajusteDia = ajustePorDia[dia] ?? 0;
  const variacion = variacionesPorVariable[key][indiceHora];
  const escala = key === 'precipitacion' ? 0.45 : key === 'caudal' ? 1.15 : 1;
  const valor = base + (variacion * escala) + ajusteDia + ajusteEstacion;

  return Math.max(0, Number(valor.toFixed(1)));
}

function Comparacion() {
  const [zona, setZona] = useState(zonasComparacion[0]);
  const [variable, setVariable] = useState('Temperatura');
  const [dia, setDia] = useState('Miércoles');
  const configuracion = configuracionVariables[variable];

  const estacionesZona = useMemo(() => estaciones
    .filter((estacion) => estacion.zona === zona)
    .map((estacion, index) => ({
      ...estacion,
      nombreComparacion: construirNombreEstacion(estacion),
      color: coloresEstaciones[index % coloresEstaciones.length],
    })), [zona]);

  const datosHorarios = useMemo(() => horasDia.map((hora, indiceHora) => {
    const registro = { hora };
    estacionesZona.forEach((estacion) => {
      registro[estacion.nombreComparacion] = obtenerValorHorario(estacion, configuracion.key, indiceHora, dia);
    });
    return registro;
  }), [configuracion.key, dia, estacionesZona]);

  const resumenEstaciones = useMemo(() => estacionesZona.map((estacion) => {
    const valores = datosHorarios.map((registro) => registro[estacion.nombreComparacion]);
    const promedio = valores.reduce((total, valor) => total + valor, 0) / valores.length;
    return {
      fuente: estacion.fuente,
      estacion: estacion.nombreComparacion,
      promedio: promedio.toFixed(1),
      minimo: Math.min(...valores).toFixed(1),
      maximo: Math.max(...valores).toFixed(1),
      ultimaActualizacion: estacion.ultimaActualizacion,
    };
  }), [datosHorarios, estacionesZona]);

  return (
    <div className="page-stack">
      <section className="page-heading wide">
        <span className="eyebrow compact">Comparación integrada</span>
        <h1>Comparación temporal de estaciones</h1>
        <p>
          Una de las principales ventajas de HidrometeorologíaChile es centralizar información proveniente de distintas instituciones,
          permitiendo comparar rápidamente datos para una misma zona sin necesidad de consultar múltiples plataformas por separado.
        </p>
      </section>

      <section className="comparison-panel">
        <div className="chart-header">
          <div className="section-title">
            <h2>{zona}</h2>
            <p>Selecciona zona, variable y día para comparar la evolución horaria de todas las estaciones disponibles.</p>
          </div>
          <div className="chart-controls">
            <label>Zona<select value={zona} onChange={(event) => setZona(event.target.value)}>{zonasComparacion.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value)}>{variablesDisponibles.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
        </div>

        <div className="day-selector" aria-label="Seleccionar día de comparación">
          {diasSemana.map((item) => (
            <button key={item} type="button" className={item === dia ? 'active' : ''} onClick={() => setDia(item)}>{item}</button>
          ))}
        </div>

        <div className="business-note">
          Esta vista permite comparar los registros reportados por distintas estaciones para una misma zona geográfica durante un día específico,
          facilitando el análisis de diferencias entre fuentes y el comportamiento temporal de las variables hidrometeorológicas.
        </div>

        <div className="chart-wrapper comparison-chart temporal-chart">
          <ResponsiveContainer width="100%" height={390}>
            <LineChart data={datosHorarios} margin={{ top: 20, right: 28, bottom: 20, left: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d9ecf7" />
              <XAxis dataKey="hora" tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: `${variable} (${configuracion.unidad})`, angle: -90, position: 'insideLeft', fill: '#55708a', fontSize: 12 }} />
              <Tooltip formatter={(valor, nombre) => [`${valor} ${configuracion.unidad}`, nombre]} labelFormatter={(hora) => `${dia} · ${hora}`} contentStyle={{ border: '1px solid #c9e3f3', borderRadius: '16px', boxShadow: '0 16px 36px rgba(34, 84, 128, 0.16)' }} />
              <Legend verticalAlign="top" height={48} />
              {estacionesZona.map((estacion) => (
                <Line key={estacion.id} type="monotone" dataKey={estacion.nombreComparacion} name={estacion.nombreComparacion} stroke={estacion.color} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 7 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="table-wrapper comparison-table">
          <table>
            <thead><tr><th>Fuente</th><th>Estación</th><th>Día</th><th>Promedio</th><th>Mínimo</th><th>Máximo</th><th>Última actualización</th></tr></thead>
            <tbody>{resumenEstaciones.map((fila) => <tr key={`${fila.fuente}-${fila.estacion}`}><td>{fila.fuente}</td><td>{fila.estacion}</td><td>{dia}</td><td>{fila.promedio} {configuracion.unidad}</td><td>{fila.minimo} {configuracion.unidad}</td><td>{fila.maximo} {configuracion.unidad}</td><td>{fila.ultimaActualizacion}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Comparacion;
