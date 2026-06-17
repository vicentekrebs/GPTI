import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { configuracionVariables, estaciones, variablesDisponibles, zonasComparacion } from '../data/hydroData.js';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const diasSemanaCortos = {
  Lunes: 'Lun',
  Martes: 'Mar',
  Miércoles: 'Mié',
  Jueves: 'Jue',
  Viernes: 'Vie',
  Sábado: 'Sáb',
  Domingo: 'Dom',
};
const horasDia = Array.from({ length: 24 }, (_, indice) => `${String(indice).padStart(2, '0')}:00`);
const coloresEstaciones = ['#0ea5e9', '#f97316', '#14b8a6', '#8b5cf6', '#ef4444'];

const variacionesPorVariable = {
  temperatura: [-2.6, -2.9, -3.1, -3.2, -3.1, -2.8, -2.2, -1.4, -0.4, 0.7, 1.8, 2.7, 3.4, 3.8, 3.6, 3.1, 2.2, 1.1, 0.2, -0.5, -1.1, -1.6, -2, -2.3],
  precipitacion: [0.8, 0.7, 0.6, 0.5, 0.6, 0.8, 1, 1.2, 1.1, 0.9, 0.7, 0.5, 0.4, 0.4, 0.5, 0.6, 0.8, 1.1, 1.3, 1.2, 1.1, 1, 0.9, 0.8],
  caudal: [-1.2, -1.4, -1.5, -1.6, -1.5, -1.2, -0.8, -0.3, 0.2, 0.7, 1.2, 1.6, 1.9, 2.1, 2, 1.7, 1.3, 0.8, 0.4, 0, -0.3, -0.6, -0.8, -1],
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

function formatearNumero(valor) {
  return Number(valor).toFixed(1);
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
      promedio,
      minimo: Math.min(...valores),
      maximo: Math.max(...valores),
      ultimaActualizacion: estacion.ultimaActualizacion,
      ultimaActualizacionExacta: estacion.ultimaActualizacionExacta,
    };
  }), [datosHorarios, estacionesZona]);

  const insight = useMemo(() => {
    if (!resumenEstaciones.length) return [];

    const mayorPromedio = resumenEstaciones.reduce((mayor, estacion) => (estacion.promedio > mayor.promedio ? estacion : mayor), resumenEstaciones[0]);
    const diferenciasHorarias = datosHorarios.map((registro) => {
      const valores = estacionesZona.map((estacion) => registro[estacion.nombreComparacion]);
      return Math.max(...valores) - Math.min(...valores);
    });
    const mayorDiferencia = Math.max(...diferenciasHorarias);

    return [
      `Para el día seleccionado, ${mayorPromedio.estacion} registró el promedio diario más alto.`,
      `La mayor diferencia observada entre estaciones fue de ${formatearNumero(mayorDiferencia)} ${configuracion.unidad}.`,
    ];
  }, [configuracion.unidad, datosHorarios, estacionesZona, resumenEstaciones]);

  return (
    <div className="page-stack comparison-page">
      <section className="comparison-panel">
        <div className="comparison-controls" aria-label="Controles de comparación">
          <label>Zona<select value={zona} onChange={(event) => setZona(event.target.value)}>{zonasComparacion.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value)}>{variablesDisponibles.map((item) => <option key={item}>{item}</option>)}</select></label>
          <div className="control-group">
            <span>Día</span>
            <div className="day-selector compact" aria-label="Seleccionar día de comparación">
              {diasSemana.map((item) => (
                <button key={item} type="button" className={item === dia ? 'active' : ''} onClick={() => setDia(item)}>{diasSemanaCortos[item]}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-wrapper comparison-chart">
          <ResponsiveContainer width="100%" height={520}>
            <LineChart data={datosHorarios} margin={{ top: 18, right: 28, bottom: 18, left: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d9ecf7" />
              <XAxis dataKey="hora" tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: `${variable} (${configuracion.unidad})`, angle: -90, position: 'insideLeft', fill: '#55708a', fontSize: 12 }} />
              <Tooltip formatter={(valor, nombre) => [`${valor} ${configuracion.unidad}`, nombre]} labelFormatter={(hora) => `${dia} · ${hora}`} contentStyle={{ border: '1px solid #c9e3f3', borderRadius: '16px', boxShadow: '0 16px 36px rgba(34, 84, 128, 0.16)' }} />
              <Legend verticalAlign="top" height={48} />
              {estacionesZona.map((estacion) => (
                <Line key={estacion.id} type="monotone" dataKey={estacion.nombreComparacion} name={estacion.nombreComparacion} stroke={estacion.color} strokeWidth={3} dot={false} activeDot={{ r: 7 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="table-wrapper comparison-table">
          <table>
            <thead><tr><th>Fuente</th><th>Estación</th><th>Promedio diario</th><th>Mínimo diario</th><th>Máximo diario</th><th>Última actualización</th></tr></thead>
            <tbody>{resumenEstaciones.map((fila) => <tr key={`${fila.fuente}-${fila.estacion}`}><td>{fila.fuente}</td><td>{fila.estacion}</td><td>{formatearNumero(fila.promedio)} {configuracion.unidad}</td><td>{formatearNumero(fila.minimo)} {configuracion.unidad}</td><td>{formatearNumero(fila.maximo)} {configuracion.unidad}</td><td><span className="update-date">{fila.ultimaActualizacionExacta}</span><span className="update-relative">{fila.ultimaActualizacion}</span></td></tr>)}</tbody>
          </table>
        </div>

        <div className="comparison-insight" aria-label="Insight automático">
          {insight.map((texto) => <p key={texto}>{texto}</p>)}
        </div>
      </section>
    </div>
  );
}

export default Comparacion;
