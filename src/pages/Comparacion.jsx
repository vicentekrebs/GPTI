import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { configuracionVariables, estaciones, variablesDisponibles, zonasComparacion } from '../data/hydroData.js';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const horasDia = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'];
const coloresEstaciones = ['#0ea5e9', '#f97316', '#14b8a6', '#8b5cf6', '#ef4444'];

const variacionesPorVariable = {
  temperatura: [-2.4, -2.7, -2.9, -3, -2.8, -2.5, -1.8, -1, -0.2, 0.6, 1.4, 2.1],
  precipitacion: [0.7, 0.6, 0.5, 0.5, 0.6, 0.8, 1, 1.1, 0.9, 0.7, 0.5, 0.4],
  caudal: [-1.1, -1.3, -1.4, -1.5, -1.3, -1, -0.6, -0.2, 0.3, 0.8, 1.2, 1.5],
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


function calcularMediana(valores) {
  if (!valores.length) return 0;
  const ordenados = [...valores].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  return ordenados.length % 2 === 0 ? (ordenados[mitad - 1] + ordenados[mitad]) / 2 : ordenados[mitad];
}

function calcularResumenEstadistico(valores) {
  if (!valores.length) {
    return {
      promedio: 0,
      mediana: 0,
      desviacion: 0,
      minimo: 0,
      maximo: 0,
      rango: 0,
      coeficienteVariacion: 0,
      acuerdo: 100,
    };
  }

  const promedio = valores.reduce((total, valor) => total + valor, 0) / valores.length;
  const mediana = calcularMediana(valores);
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);
  const rango = maximo - minimo;
  const varianza = valores.reduce((total, valor) => total + ((valor - promedio) ** 2), 0) / valores.length;
  const desviacion = Math.sqrt(varianza);
  const coeficienteVariacion = promedio === 0 ? 0 : (desviacion / Math.abs(promedio)) * 100;
  const acuerdo = Math.max(0, 100 - coeficienteVariacion);

  return { promedio, mediana, desviacion, minimo, maximo, rango, coeficienteVariacion, acuerdo };
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
  const [horaSeleccionada, setHoraSeleccionada] = useState('08:00');
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
      promedio: formatearNumero(promedio),
      minimo: formatearNumero(Math.min(...valores)),
      maximo: formatearNumero(Math.max(...valores)),
      ultimaActualizacion: estacion.ultimaActualizacion,
    };
  }), [datosHorarios, estacionesZona]);

  const resumenHoraSeleccionada = useMemo(() => {
    const registro = datosHorarios.find((item) => item.hora === horaSeleccionada) ?? datosHorarios[0];
    const valores = estacionesZona.map((estacion) => registro[estacion.nombreComparacion]);

    return calcularResumenEstadistico(valores);
  }, [datosHorarios, estacionesZona, horaSeleccionada]);

  const resumenDiario = useMemo(() => {
    const promediosPorFuente = estacionesZona.map((estacion) => {
      const valores = datosHorarios.map((registro) => registro[estacion.nombreComparacion]);
      return valores.reduce((total, valor) => total + valor, 0) / valores.length;
    });
    const minimosPorFuente = estacionesZona.map((estacion) => Math.min(...datosHorarios.map((registro) => registro[estacion.nombreComparacion])));
    const maximosPorFuente = estacionesZona.map((estacion) => Math.max(...datosHorarios.map((registro) => registro[estacion.nombreComparacion])));
    const todosLosValores = datosHorarios.flatMap((registro) => estacionesZona.map((estacion) => registro[estacion.nombreComparacion]));

    return {
      promedios: calcularResumenEstadistico(promediosPorFuente),
      minimos: calcularResumenEstadistico(minimosPorFuente),
      maximos: calcularResumenEstadistico(maximosPorFuente),
      general: calcularResumenEstadistico(todosLosValores),
    };
  }, [datosHorarios, estacionesZona]);

  const manejarClickGrafico = (evento) => {
    if (evento?.activeLabel) setHoraSeleccionada(evento.activeLabel);
  };

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
            <p>Selecciona zona, variable y día para comparar, entre 00:00 y 11:00, la evolución horaria de todas las estaciones disponibles.</p>
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
          facilitando el análisis de diferencias, acuerdos y dispersión entre fuentes para una misma variable hidrometeorológica.
        </div>

        <div className="chart-wrapper comparison-chart temporal-chart">
          <ResponsiveContainer width="100%" height={390}>
            <LineChart data={datosHorarios} margin={{ top: 20, right: 28, bottom: 20, left: 4 }} onClick={manejarClickGrafico}>
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


        <div className="hour-selector" aria-label="Seleccionar hora para resumen estadístico">
          {horasDia.map((hora) => (
            <button key={hora} type="button" className={hora === horaSeleccionada ? 'active' : ''} onClick={() => setHoraSeleccionada(hora)}>{hora}</button>
          ))}
        </div>

        <div className="stats-grid" aria-label="Resumen estadístico de fuentes">
          <article className="stats-card highlighted">
            <span>Resumen por hora · {horaSeleccionada}</span>
            <strong>{formatearNumero(resumenHoraSeleccionada.promedio)} {configuracion.unidad}</strong>
            <p>Mediana {formatearNumero(resumenHoraSeleccionada.mediana)} · σ {formatearNumero(resumenHoraSeleccionada.desviacion)} · acuerdo {formatearNumero(resumenHoraSeleccionada.acuerdo)}%</p>
          </article>
          <article className="stats-card">
            <span>Máxima diaria entre fuentes</span>
            <strong>{formatearNumero(resumenDiario.maximos.promedio)} {configuracion.unidad}</strong>
            <p>Mediana {formatearNumero(resumenDiario.maximos.mediana)} · σ {formatearNumero(resumenDiario.maximos.desviacion)} · rango {formatearNumero(resumenDiario.maximos.rango)}</p>
          </article>
          <article className="stats-card">
            <span>Mínima diaria entre fuentes</span>
            <strong>{formatearNumero(resumenDiario.minimos.promedio)} {configuracion.unidad}</strong>
            <p>Mediana {formatearNumero(resumenDiario.minimos.mediana)} · σ {formatearNumero(resumenDiario.minimos.desviacion)} · rango {formatearNumero(resumenDiario.minimos.rango)}</p>
          </article>
          <article className="stats-card">
            <span>Dispersión general del día</span>
            <strong>σ {formatearNumero(resumenDiario.general.desviacion)}</strong>
            <p>Promedio {formatearNumero(resumenDiario.general.promedio)} · CV {formatearNumero(resumenDiario.general.coeficienteVariacion)}% · acuerdo {formatearNumero(resumenDiario.general.acuerdo)}%</p>
          </article>
        </div>

        <div className="agreement-note">
          El indicador de acuerdo se calcula como 100 menos el coeficiente de variación: valores altos indican que las fuentes están reportando cifras más parecidas.
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
