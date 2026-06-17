import { metricasResumen } from '../data/hydroData.js';

function Inicio() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <span className="eyebrow">Plataforma de consulta integrada</span>
          <h1>HidrometeorologíaChile</h1>
          <p>
            Centraliza datos hidrometeorológicos de distintas fuentes, como instituciones públicas,
            universidades y empresas privadas, en una sola interfaz para consultar, filtrar y comparar
            estaciones ubicadas en una misma zona geográfica.
          </p>
        </div>
        <div className="hero-card">
          <span>Valor principal</span>
          <strong>1</strong>
          <small>interfaz para revisar múltiples fuentes de datos</small>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Resumen general">
        <article className="metric-card stations"><span>Total de estaciones disponibles</span><strong>{metricasResumen.totalEstaciones}</strong></article>
        <article className="metric-card sources"><span>Fuentes integradas</span><strong>{metricasResumen.fuentesIntegradas}</strong></article>
        <article className="metric-card variables"><span>Variables disponibles</span><strong>{metricasResumen.variablesDisponibles}</strong></article>
        <article className="metric-card updated"><span>Última actualización general</span><strong>{metricasResumen.ultimaActualizacionGeneral}</strong></article>
      </section>

      <section className="value-panel">
        <span className="eyebrow compact">Propuesta de valor</span>
        <h2>Consulta, filtra y compara información hidrometeorológica de distintas fuentes sin tener que revisar múltiples plataformas por separado.</h2>
        <p>
          La app está organizada para que primero entiendas el alcance de la plataforma, luego consultes
          estaciones disponibles y finalmente compares mediciones de varias instituciones para una misma zona.
        </p>
      </section>
    </div>
  );
}

export default Inicio;
