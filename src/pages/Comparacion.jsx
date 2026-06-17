import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { configuracionVariables, estaciones, variablesDisponibles, zonasComparacion } from '../data/hydroData.js';

function Comparacion() {
  const [zona, setZona] = useState(zonasComparacion[0]);
  const [variable, setVariable] = useState('Temperatura');
  const configuracion = configuracionVariables[variable];

  const datosZona = useMemo(() => estaciones
    .filter((estacion) => estacion.zona === zona)
    .map((estacion) => ({
      fuente: estacion.fuente,
      estacion: estacion.nombre,
      variable,
      valor: estacion[configuracion.key],
      ultimaActualizacion: estacion.ultimaActualizacion,
    })), [configuracion.key, variable, zona]);

  return (
    <div className="page-stack">
      <section className="page-heading wide">
        <span className="eyebrow compact">Comparación integrada</span>
        <h1>Comparación de fuentes por zona</h1>
        <p>
          Una de las principales ventajas de HidrometeorologíaChile es centralizar información proveniente de distintas instituciones,
          permitiendo comparar rápidamente datos para una misma zona sin necesidad de consultar múltiples plataformas por separado.
        </p>
      </section>

      <section className="comparison-panel">
        <div className="chart-header">
          <div className="section-title"><h2>{zona}</h2><p>Selecciona una zona y variable para actualizar la tabla y la gráfica.</p></div>
          <div className="chart-controls">
            <label>Zona<select value={zona} onChange={(event) => setZona(event.target.value)}>{zonasComparacion.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value)}>{variablesDisponibles.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
        </div>

        <div className="table-wrapper comparison-table">
          <table>
            <thead><tr><th>Fuente</th><th>Estación</th><th>Variable</th><th>Valor</th><th>Última actualización</th></tr></thead>
            <tbody>{datosZona.map((fila) => <tr key={`${fila.fuente}-${fila.estacion}`}><td>{fila.fuente}</td><td>{fila.estacion}</td><td>{fila.variable}</td><td>{fila.valor} {configuracion.unidad}</td><td>{fila.ultimaActualizacion}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="chart-wrapper comparison-chart">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={datosZona} margin={{ top: 16, right: 24, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d9ecf7" />
              <XAxis dataKey="fuente" tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: '#55708a', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: `${variable} (${configuracion.unidad})`, angle: -90, position: 'insideLeft', fill: '#55708a', fontSize: 12 }} />
              <Tooltip formatter={(valor) => [`${valor} ${configuracion.unidad}`, variable]} labelFormatter={(fuente) => `Fuente: ${fuente}`} contentStyle={{ border: '1px solid #c9e3f3', borderRadius: '16px', boxShadow: '0 16px 36px rgba(34, 84, 128, 0.16)' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="valor" name={variable} fill={configuracion.color} radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Comparacion;
