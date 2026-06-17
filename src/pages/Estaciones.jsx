import { useMemo, useState } from 'react';
import { configuracionVariables, estaciones, variablesDisponibles } from '../data/hydroData.js';

const estados = ['Actualizado', 'Desactualizado', 'Sin datos'];
const estadoClases = { Actualizado: 'actualizado', Desactualizado: 'desactualizado', 'Sin datos': 'sin-datos' };

const formatearValor = (estacion, variable) => `${estacion[configuracionVariables[variable].key]} ${configuracionVariables[variable].unidad}`;

function Estaciones() {
  const [region, setRegion] = useState('Todas');
  const [fuente, setFuente] = useState('Todas');
  const [variable, setVariable] = useState('Todas');
  const [estado, setEstado] = useState('Todos');

  const regiones = useMemo(() => ['Todas', ...new Set(estaciones.map((item) => item.region))], []);
  const fuentes = useMemo(() => ['Todas', ...new Set(estaciones.map((item) => item.fuente))], []);

  const estacionesFiltradas = useMemo(() => estaciones.filter((estacion) => (
    (region === 'Todas' || estacion.region === region)
    && (fuente === 'Todas' || estacion.fuente === fuente)
    && (estado === 'Todos' || estacion.estadoDatos === estado)
  )), [estado, fuente, region]);

  return (
    <div className="page-stack">
      <section className="page-heading">
        <span className="eyebrow compact">Consulta de estaciones</span>
        <h1>Estaciones hidrometeorológicas</h1>
        <p>Explora estaciones simuladas y filtra por región, fuente, variable hidrometeorológica o estado de datos.</p>
      </section>

      <section className="filters-panel">
        <div><h2>Filtros de consulta</h2><p>Los filtros actualizan el listado sin conectarse a APIs reales.</p></div>
        <div className="filters">
          <label>Región<select value={region} onChange={(event) => setRegion(event.target.value)}>{regiones.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Fuente de datos<select value={fuente} onChange={(event) => setFuente(event.target.value)}>{fuentes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Variable hidrometeorológica<select value={variable} onChange={(event) => setVariable(event.target.value)}><option>Todas</option>{variablesDisponibles.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Estado de datos<select value={estado} onChange={(event) => setEstado(event.target.value)}><option>Todos</option>{estados.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </section>

      <section className="stations-grid" aria-label="Listado de estaciones">
        {estacionesFiltradas.map((estacion) => (
          <article className="station-card" key={estacion.id}>
            <div className="station-header"><div><h3>{estacion.nombre}</h3><span>{estacion.zona}</span><small>{estacion.region} · {estacion.fuente}</small></div><span className={`status ${estadoClases[estacion.estadoDatos]}`}>{estacion.estadoDatos}</span></div>
            <div className="station-values">{(variable === 'Todas' ? variablesDisponibles : [variable]).map((item) => <div key={item}><span>{item}</span><strong>{formatearValor(estacion, item)}</strong></div>)}</div>
            <p className="last-update">Última actualización: {estacion.ultimaActualizacion}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Estaciones;
