import { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { configuracionVariables, estaciones, variablesDisponibles, zonasComparacion } from '../data/hydroData.js';

const formateadorDiaSemana = new Intl.DateTimeFormat('es-CL', { weekday: 'long' });
const formateadorFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' });
const horasDia = Array.from({ length: 24 }, (_, indice) => `${String(indice).padStart(2, '0')}:00`);
const coloresEstaciones = ['#0ea5e9', '#f97316', '#14b8a6', '#8b5cf6', '#ef4444'];

const variacionesPorVariable = {
  temperatura: [-2.6, -2.9, -3.1, -3.2, -3.1, -2.8, -2.2, -1.4, -0.4, 0.7, 1.8, 2.7, 3.4, 3.8, 3.6, 3.1, 2.2, 1.1, 0.2, -0.5, -1.1, -1.6, -2, -2.3],
  precipitacion: [0.8, 0.7, 0.6, 0.5, 0.6, 0.8, 1, 1.2, 1.1, 0.9, 0.7, 0.5, 0.4, 0.4, 0.5, 0.6, 0.8, 1.1, 1.3, 1.2, 1.1, 1, 0.9, 0.8],
  caudal: [-1.2, -1.4, -1.5, -1.6, -1.5, -1.2, -0.8, -0.3, 0.2, 0.7, 1.2, 1.6, 1.9, 2.1, 2, 1.7, 1.3, 0.8, 0.4, 0, -0.3, -0.6, -0.8, -1],
  nivelAgua: [-0.09, -0.1, -0.1, -0.11, -0.1, -0.08, -0.06, -0.04, -0.01, 0.02, 0.05, 0.08, 0.1, 0.11, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08],
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


function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function limpiarPuntoFinal(texto) {
  return texto.replace(/\.$/, '');
}

function crearDiaSelector(fecha, indice) {
  const fechaDia = new Date(fecha);
  fechaDia.setDate(fecha.getDate() + indice);

  const nombre = capitalizar(formateadorDiaSemana.format(fechaDia));
  const fechaCorta = capitalizar(limpiarPuntoFinal(formateadorFecha.format(fechaDia)));

  return {
    id: fechaDia.toISOString(),
    nombre,
    etiqueta: indice === 0 ? 'Hoy' : nombre,
    fecha: fechaCorta,
  };
}

function obtenerDiasSelector(fecha = new Date()) {
  return Array.from({ length: 7 }, (_, indice) => crearDiaSelector(fecha, indice));
}

function obtenerMilisegundosHastaManana(fecha = new Date()) {
  const manana = new Date(fecha);
  manana.setHours(24, 0, 0, 0);

  return manana.getTime() - fecha.getTime();
}

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

function formatearMetrica(valor, unidad) {
  return `${formatearNumero(valor)} ${unidad}`;
}

function normalizarClase(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
}

function obtenerValorHorario(estacion, key, indiceHora, dia) {
  const base = estacion[key];
  const ajusteEstacion = ((estacion.id % 3) - 1) * 0.45;
  const ajusteDia = ajustePorDia[dia] ?? 0;
  const variacion = variacionesPorVariable[key][indiceHora];
  const escala = key === 'precipitacion' ? 0.45 : key === 'caudal' ? 1.15 : key === 'nivelAgua' ? 1 : 1;
  const ajusteLocal = key === 'nivelAgua' ? ajusteEstacion * 0.08 : ajusteEstacion;
  const ajusteDiario = key === 'nivelAgua' ? ajusteDia * 0.04 : ajusteDia;
  const valor = base + (variacion * escala) + ajusteDiario + ajusteLocal;

  return Math.max(0, Number(valor.toFixed(1)));
}

function obtenerPromedioHistorico(estacion, key) {
  const factoresHistoricos = {
    temperatura: 0.98,
    precipitacion: 1.08,
    caudal: 0.94,
    nivelAgua: 0.96,
  };

  return Math.max(0.1, estacion[key] * (factoresHistoricos[key] ?? 1));
}


function obtenerPromedio(valores) {
  if (!valores.length) return 0;

  return valores.reduce((total, valor) => total + valor, 0) / valores.length;
}

function obtenerSerieAgregada(estacionesZona, key, dia) {
  return horasDia.map((hora, indiceHora) => {
    const valoresEstaciones = estacionesZona.map((estacion) => obtenerValorHorario(estacion, key, indiceHora, dia));

    return {
      hora,
      valor: obtenerPromedio(valoresEstaciones),
    };
  });
}

function obtenerResumenDia(estacionesZona, dia) {
  const temperatura = obtenerSerieAgregada(estacionesZona, 'temperatura', dia).map((registro) => registro.valor);
  const precipitacion = obtenerSerieAgregada(estacionesZona, 'precipitacion', dia).map((registro) => registro.valor);
  const caudal = obtenerSerieAgregada(estacionesZona, 'caudal', dia).map((registro) => registro.valor);
  const nivelAgua = obtenerSerieAgregada(estacionesZona, 'nivelAgua', dia).map((registro) => registro.valor);

  return {
    temperaturaMaxima: Math.max(...temperatura),
    temperaturaMinima: Math.min(...temperatura),
    precipitacionTotal: precipitacion.reduce((total, valor) => total + valor, 0),
    caudalPromedio: obtenerPromedio(caudal),
    nivelPromedio: obtenerPromedio(nivelAgua),
  };
}

function obtenerAnomalia(promedio, historico) {
  const diferencia = ((promedio - historico) / historico) * 100;

  if (diferencia > 5) {
    return { texto: `▲ Sobre lo normal (+${Math.round(diferencia)}%)`, tipo: 'sobre' };
  }

  if (diferencia < -5) {
    return { texto: `▼ Bajo lo normal (${Math.round(diferencia)}%)`, tipo: 'bajo' };
  }

  return { texto: '● Normal', tipo: 'normal' };
}

function Comparacion() {
  const [zona, setZona] = useState(zonasComparacion[0]);
  const [variable, setVariable] = useState('Temperatura');
  const [fechaActual, setFechaActual] = useState(() => new Date());
  const diasSelector = useMemo(() => obtenerDiasSelector(fechaActual), [fechaActual]);
  const [diaSeleccionadoId, setDiaSeleccionadoId] = useState(() => obtenerDiasSelector()[0].id);
  const configuracion = configuracionVariables[variable];

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      const nuevaFecha = new Date();
      setFechaActual(nuevaFecha);
      setDiaSeleccionadoId(obtenerDiasSelector(nuevaFecha)[0].id);
    }, obtenerMilisegundosHastaManana());

    return () => window.clearTimeout(temporizador);
  }, [fechaActual]);

  const estacionesZona = useMemo(() => estaciones
    .filter((estacion) => estacion.zona === zona)
    .map((estacion, index) => ({
      ...estacion,
      nombreComparacion: construirNombreEstacion(estacion),
      color: coloresEstaciones[index % coloresEstaciones.length],
    })), [zona]);

  const diaSeleccionado = useMemo(() => (
    diasSelector.find((item) => item.id === diaSeleccionadoId) ?? diasSelector[0]
  ), [diaSeleccionadoId, diasSelector]);

  const tarjetasDias = useMemo(() => diasSelector.map((item) => ({
    ...item,
    resumen: obtenerResumenDia(estacionesZona, item.nombre),
  })), [diasSelector, estacionesZona]);

  const datosHorarios = useMemo(() => horasDia.map((hora, indiceHora) => {
    const registro = { hora };
    estacionesZona.forEach((estacion) => {
      registro[estacion.nombreComparacion] = obtenerValorHorario(estacion, configuracion.key, indiceHora, diaSeleccionado.nombre);
    });
    return registro;
  }), [configuracion.key, diaSeleccionado.nombre, estacionesZona]);

  const resumenEstaciones = useMemo(() => estacionesZona.map((estacion) => {
    const valores = datosHorarios.map((registro) => registro[estacion.nombreComparacion]);
    const promedio = valores.reduce((total, valor) => total + valor, 0) / valores.length;
    return {
      fuente: estacion.fuente,
      estacion: estacion.nombreComparacion,
      promedio,
      minimo: Math.min(...valores),
      maximo: Math.max(...valores),
      anomalia: obtenerAnomalia(promedio, obtenerPromedioHistorico(estacion, configuracion.key)),
      estadoDatos: estacion.estadoDatos,
      ultimaActualizacion: estacion.ultimaActualizacion,
      ultimaActualizacionExacta: estacion.ultimaActualizacionExacta,
    };
  }), [configuracion.key, datosHorarios, estacionesZona]);

  const metricasComparativas = useMemo(() => {
    if (!resumenEstaciones.length) return [];

    const promedios = resumenEstaciones.map((estacion) => estacion.promedio);
    const minimos = resumenEstaciones.map((estacion) => estacion.minimo);
    const maximos = resumenEstaciones.map((estacion) => estacion.maximo);
    const promedioDiarioGlobal = promedios.reduce((total, valor) => total + valor, 0) / promedios.length;
    const minimoDiarioGlobal = minimos.reduce((total, valor) => total + valor, 0) / minimos.length;
    const maximoDiarioGlobal = maximos.reduce((total, valor) => total + valor, 0) / maximos.length;
    const diferenciaMaxima = Math.max(...promedios) - Math.min(...promedios);
    const varianza = promedios.reduce((total, valor) => total + ((valor - promedioDiarioGlobal) ** 2), 0) / promedios.length;
    const desviacionEstandar = Math.sqrt(varianza);
    const indiceVariabilidad = promedioDiarioGlobal > 0 ? (desviacionEstandar / promedioDiarioGlobal) * 100 : 0;

    return [
      { etiqueta: 'Promedio diario global', valor: formatearNumero(promedioDiarioGlobal), unidad: configuracion.unidad },
      { etiqueta: 'Mínimo diario global', valor: formatearNumero(minimoDiarioGlobal), unidad: configuracion.unidad },
      { etiqueta: 'Máximo diario global', valor: formatearNumero(maximoDiarioGlobal), unidad: configuracion.unidad },
      { etiqueta: 'Diferencia máxima entre estaciones', valor: formatearNumero(diferenciaMaxima), unidad: configuracion.unidad },
      { etiqueta: 'Desviación estándar entre estaciones', valor: formatearNumero(desviacionEstandar), unidad: configuracion.unidad },
      { etiqueta: 'Índice de variabilidad', valor: formatearNumero(indiceVariabilidad), unidad: '%' },
    ];
  }, [configuracion.unidad, resumenEstaciones]);

  return (
    <div className="page-stack comparison-page">
      <section className="comparison-panel">
        <div className="comparison-location-control" aria-label="Selector de lugar o zona">
          <label>Lugar / zona<select value={zona} onChange={(event) => setZona(event.target.value)}>{zonasComparacion.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <div className="forecast-day-row" aria-label="Pronóstico de los próximos 7 días">
          {tarjetasDias.map((item) => (
            <button key={item.id} type="button" className={`forecast-day-card${item.id === diaSeleccionado.id ? ' active' : ''}`} onClick={() => setDiaSeleccionadoId(item.id)}>
              <span className="forecast-day-name">{item.etiqueta}</span>
              <span className="forecast-day-date">{item.fecha}</span>
              <span className="forecast-day-metric"><span aria-hidden="true">🌡️</span> Máx {formatearMetrica(item.resumen.temperaturaMaxima, '°C')}</span>
              <span className="forecast-day-metric"><span aria-hidden="true">💧</span> Mín {formatearMetrica(item.resumen.temperaturaMinima, '°C')}</span>
              <span className="forecast-day-metric"><span aria-hidden="true">🌧️</span> {formatearMetrica(item.resumen.precipitacionTotal, 'mm')}</span>
              <span className="forecast-day-metric"><span aria-hidden="true">💦</span> {formatearMetrica(item.resumen.caudalPromedio, 'm³/s')}</span>
            </button>
          ))}
        </div>

        <div className="comparison-chart-control" aria-label="Selector de variable del gráfico">
          <label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value)}>{variablesDisponibles.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <div className="chart-wrapper comparison-chart">
          <ResponsiveContainer width="100%" height={520}>
            <LineChart data={datosHorarios} margin={{ top: 18, right: 28, bottom: 18, left: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d9ecf7" />
              <XAxis dataKey="hora" tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: `${variable} (${configuracion.unidad})`, angle: -90, position: 'insideLeft', fill: '#55708a', fontSize: 12 }} />
              <Tooltip formatter={(valor, nombre) => [`${valor} ${configuracion.unidad}`, nombre]} labelFormatter={(hora) => `${diaSeleccionado.etiqueta} · ${hora}`} contentStyle={{ border: '1px solid #c9e3f3', borderRadius: '16px', boxShadow: '0 16px 36px rgba(34, 84, 128, 0.16)' }} />
              <Legend verticalAlign="top" height={48} />
              {estacionesZona.map((estacion) => (
                <Line key={estacion.id} type="monotone" dataKey={estacion.nombreComparacion} name={estacion.nombreComparacion} stroke={estacion.color} strokeWidth={3} dot={false} activeDot={{ r: 7 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="table-wrapper comparison-table">
          <table>
            <thead><tr><th>Fuente</th><th>Estación</th><th>Promedio diario</th><th>Mínimo diario</th><th>Máximo diario</th><th>Anomalía</th><th>Estado del dato</th><th>Última actualización</th></tr></thead>
            <tbody>{resumenEstaciones.map((fila) => <tr key={`${fila.fuente}-${fila.estacion}`}><td>{fila.fuente}</td><td>{fila.estacion}</td><td>{formatearNumero(fila.promedio)} {configuracion.unidad}</td><td>{formatearNumero(fila.minimo)} {configuracion.unidad}</td><td>{formatearNumero(fila.maximo)} {configuracion.unidad}</td><td><span className={`anomaly-badge ${fila.anomalia.tipo}`}>{fila.anomalia.texto}</span></td><td><span className={`data-status-badge ${normalizarClase(fila.estadoDatos)}`}>{fila.estadoDatos}</span></td><td><span className="update-date">{fila.ultimaActualizacionExacta}</span><span className="update-relative">{fila.ultimaActualizacion}</span></td></tr>)}</tbody>
          </table>
        </div>

        <div className="comparison-insight" aria-label="Métricas comparativas entre estaciones">
          {metricasComparativas.map((metrica) => (
            <article key={metrica.etiqueta} className="comparison-insight-card">
              <span>{metrica.etiqueta}</span>
              <strong>{metrica.valor} {metrica.unidad}</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Comparacion;
