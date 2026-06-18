export const variablesDisponibles = ['Temperatura', 'Precipitación', 'Caudal', 'Nivel de Agua'];

export const configuracionVariables = {
  Temperatura: { key: 'temperatura', unidad: '°C', color: '#0ea5e9' },
  Precipitación: { key: 'precipitacion', unidad: 'mm', color: '#2563eb' },
  Caudal: { key: 'caudal', unidad: 'm³/s', color: '#14b8a6' },
  'Nivel de Agua': { key: 'nivelAgua', unidad: 'm', color: '#0891b2' },
};

export const estaciones = [
  { id: 1, nombre: 'Maipo Central', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'DGA', temperatura: 14.2, precipitacion: 4.8, caudal: 39.1, nivelAgua: 1.86, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel de Agua'], ultimaActualizacion: 'Hace 5 min', ultimaActualizacionExacta: '17/06/2026 09:25', estadoDatos: 'Actualizado' },
  { id: 2, nombre: 'Estación San Carlos', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Universidad de Chile', temperatura: 14.8, precipitacion: 5.1, caudal: 40.4, nivelAgua: 1.94, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel de Agua'], ultimaActualizacion: 'Hace 8 min', ultimaActualizacionExacta: '17/06/2026 09:22', estadoDatos: 'Actualizado' },
  { id: 3, nombre: 'Faena Norte', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Empresa privada minera', temperatura: 13.9, precipitacion: 4.3, caudal: 37.8, nivelAgua: 1.72, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel de Agua'], ultimaActualizacion: 'Hace 3 min', ultimaActualizacionExacta: '17/06/2026 09:27', estadoDatos: 'Actualizado' },
  { id: 4, nombre: 'Río Elqui Centro', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'DGA', temperatura: 20.2, precipitacion: 1.8, caudal: 14.7, nivelAgua: 0.82, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel de Agua'], ultimaActualizacion: 'Hace 12 min', ultimaActualizacionExacta: '17/06/2026 09:18', estadoDatos: 'Actualizado' },
  { id: 5, nombre: 'CEAZA Vicuña', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Centro CEAZA', temperatura: 20.6, precipitacion: 1.5, caudal: 13.9, nivelAgua: 0.76, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel de Agua'], ultimaActualizacion: 'Hace 18 min', ultimaActualizacionExacta: '17/06/2026 09:12', estadoDatos: 'Actualizado' },
  { id: 6, nombre: 'Elqui Agrícola Norte', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Empresa privada agrícola', temperatura: 21.1, precipitacion: 1.2, caudal: 12.8, nivelAgua: 0.69, variablesMonitoreadas: ['Temperatura', 'Caudal', 'Nivel de Agua'], ultimaActualizacion: 'Ayer 18:20', ultimaActualizacionExacta: '16/06/2026 18:20', estadoDatos: 'Desactualizado' },
  { id: 7, nombre: 'Llanquihue Puerto Varas', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'DGA', temperatura: 11.9, precipitacion: 18.6, caudal: 78.1, nivelAgua: 3.18, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel de Agua'], ultimaActualizacion: 'Hace 10 min', ultimaActualizacionExacta: '17/06/2026 09:20', estadoDatos: 'Actualizado' },
  { id: 8, nombre: 'Universidad Austral Lago', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Universidad Austral', temperatura: 12.3, precipitacion: 20.1, caudal: 81.4, nivelAgua: 3.34, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel de Agua'], ultimaActualizacion: 'Hace 22 min', ultimaActualizacionExacta: '17/06/2026 09:08', estadoDatos: 'Actualizado' },
  { id: 9, nombre: 'Operador Turístico Sur', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Empresa privada turística', temperatura: 11.5, precipitacion: 0, caudal: 0, nivelAgua: 0, variablesMonitoreadas: ['Temperatura', 'Nivel de Agua'], ultimaActualizacion: 'Sin registro reciente', ultimaActualizacionExacta: 'Sin fecha disponible', estadoDatos: 'Sin datos' },
];

export const fuentesIntegradas = [
  { nombre: 'DGA', disponible: true },
  { nombre: 'Universidad de Chile', disponible: true },
  { nombre: 'Redes Universitarias', disponible: true },
  { nombre: 'Empresa Privada Minera', disponible: false },
];

export const zonasComparacion = ['Cuenca del Maipo', 'Valle del Elqui', 'Lago Llanquihue'];

export const metricasResumen = {
  totalEstaciones: estaciones.length,
  fuentesIntegradas: new Set(estaciones.map((estacion) => estacion.fuente)).size,
  variablesDisponibles: variablesDisponibles.length,
  ultimaActualizacionGeneral: '17 junio 2026 · 09:30',
};
