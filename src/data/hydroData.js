export const variablesDisponibles = ['Temperatura', 'Precipitación', 'Caudal'];

export const configuracionVariables = {
  Temperatura: { key: 'temperatura', unidad: '°C', color: '#0ea5e9' },
  Precipitación: { key: 'precipitacion', unidad: 'mm', color: '#2563eb' },
  Caudal: { key: 'caudal', unidad: 'm³/s', color: '#14b8a6' },
};

export const estaciones = [
  { id: 1, nombre: 'Maipo Central', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'DGA', temperatura: 14.2, precipitacion: 4.8, caudal: 39.1, ultimaActualizacion: 'Hace 5 min', estadoDatos: 'Actualizado' },
  { id: 2, nombre: 'Estación San Carlos', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Universidad de Chile', temperatura: 14.8, precipitacion: 5.1, caudal: 40.4, ultimaActualizacion: 'Hace 8 min', estadoDatos: 'Actualizado' },
  { id: 3, nombre: 'Faena Norte', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Empresa privada minera', temperatura: 13.9, precipitacion: 4.3, caudal: 37.8, ultimaActualizacion: 'Hace 3 min', estadoDatos: 'Actualizado' },
  { id: 4, nombre: 'Río Elqui Centro', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'DGA', temperatura: 20.2, precipitacion: 1.8, caudal: 14.7, ultimaActualizacion: 'Hace 12 min', estadoDatos: 'Actualizado' },
  { id: 5, nombre: 'CEAZA Vicuña', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Centro CEAZA', temperatura: 20.6, precipitacion: 1.5, caudal: 13.9, ultimaActualizacion: 'Hace 18 min', estadoDatos: 'Actualizado' },
  { id: 6, nombre: 'Elqui Agrícola Norte', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Empresa privada agrícola', temperatura: 21.1, precipitacion: 1.2, caudal: 12.8, ultimaActualizacion: 'Ayer 18:20', estadoDatos: 'Desactualizado' },
  { id: 7, nombre: 'Llanquihue Puerto Varas', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'DGA', temperatura: 11.9, precipitacion: 18.6, caudal: 78.1, ultimaActualizacion: 'Hace 10 min', estadoDatos: 'Actualizado' },
  { id: 8, nombre: 'Universidad Austral Lago', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Universidad Austral', temperatura: 12.3, precipitacion: 20.1, caudal: 81.4, ultimaActualizacion: 'Hace 22 min', estadoDatos: 'Actualizado' },
  { id: 9, nombre: 'Operador Turístico Sur', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Empresa privada turística', temperatura: 11.5, precipitacion: 0, caudal: 0, ultimaActualizacion: 'Sin registro reciente', estadoDatos: 'Sin datos' },
];

export const zonasComparacion = ['Cuenca del Maipo', 'Valle del Elqui', 'Lago Llanquihue'];

export const metricasResumen = {
  totalEstaciones: estaciones.length,
  fuentesIntegradas: new Set(estaciones.map((estacion) => estacion.fuente)).size,
  variablesDisponibles: variablesDisponibles.length,
  ultimaActualizacionGeneral: '17 junio 2026 · 09:30',
};
