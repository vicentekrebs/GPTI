import { estaciones, metricasResumen } from '../data/hydroData.js';

const estacionesActualizadas = estaciones.filter((estacion) => estacion.estadoDatos === 'Actualizado').length;
const zonasMonitoreadas = new Set(estaciones.map((estacion) => estacion.zona)).size;
const fuentesConDatosRecientes = new Set(
  estaciones
    .filter((estacion) => estacion.estadoDatos === 'Actualizado')
    .map((estacion) => estacion.fuente),
).size;
const estacionesConCaudal = estaciones.filter((estacion) => estacion.variablesMonitoreadas.includes('Caudal')).length;

function Inicio() {
  return (
    <div className="page-stack home-simple">
      <section className="hero simple-hero">
        <div>
          <span className="eyebrow">Monitoreo hidrometeorológico</span>
          <h1>Información útil para decidir con datos de agua y clima.</h1>
          <p>
            Revisa condiciones actuales de temperatura, precipitación, caudal y nivel de agua en
            estaciones de distintas zonas de Chile. La información permite detectar cambios recientes,
            comparar fuentes y priorizar la revisión de sectores con datos incompletos o desactualizados.
          </p>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Indicadores hidrometeorológicos principales">
        <article className="metric-card stations"><span>Estaciones monitoreadas</span><strong>{metricasResumen.totalEstaciones}</strong></article>
        <article className="metric-card sources"><span>Zonas con cobertura</span><strong>{zonasMonitoreadas}</strong></article>
        <article className="metric-card variables"><span>Variables hidrometeorológicas</span><strong>{metricasResumen.variablesDisponibles}</strong></article>
        <article className="metric-card updated"><span>Último corte de datos</span><strong>{metricasResumen.ultimaActualizacionGeneral}</strong></article>
      </section>

      <section className="value-panel hydro-summary" aria-label="Resumen operativo">
        <h2>Resumen operativo</h2>
        <div className="insight-grid">
          <article>
            <strong>{estacionesActualizadas} de {metricasResumen.totalEstaciones}</strong>
            <span>estaciones tienen datos actualizados para lectura inmediata.</span>
          </article>
          <article>
            <strong>{fuentesConDatosRecientes}</strong>
            <span>fuentes reportan información reciente y comparable entre zonas.</span>
          </article>
          <article>
            <strong>{estacionesConCaudal}</strong>
            <span>estaciones incluyen caudal para apoyar seguimiento de disponibilidad hídrica.</span>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
