export const variablesDisponibles = ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'];

export const configuracionVariables = {
  Temperatura: { key: 'temperatura', unidad: '°C', color: '#0ea5e9' },
  Precipitación: { key: 'precipitacion', unidad: 'mm', color: '#2563eb' },
  Caudal: { key: 'caudal', unidad: 'm³/s', color: '#14b8a6' },
  'Nivel hidrométrico': { key: 'nivelAgua', unidad: 'm', color: '#0891b2' },
};

const estacionesBase = [
  { id: 1, nombre: 'Maipo Central', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'DGA', temperatura: 14.2, precipitacion: 4.8, caudal: 39.1, nivelAgua: 1.86, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 5 min', ultimaActualizacionExacta: '18/06/2026 09:25', estadoDatos: 'Actualizado' },
  { id: 2, nombre: 'Estación San Carlos', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Universidad de Chile', temperatura: 14.8, precipitacion: 5.1, caudal: 40.4, nivelAgua: 1.94, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 8 min', ultimaActualizacionExacta: '18/06/2026 09:22', estadoDatos: 'Actualizado' },
  { id: 3, nombre: 'Faena Norte', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Empresa privada minera', temperatura: 13.9, precipitacion: 4.3, caudal: 37.8, nivelAgua: 1.72, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 3 min', ultimaActualizacionExacta: '18/06/2026 09:27', estadoDatos: 'Actualizado' },
  { id: 4, nombre: 'Mapocho Alto', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'DGA', temperatura: 12.7, precipitacion: 6.4, caudal: 24.6, nivelAgua: 1.38, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 15 min', ultimaActualizacionExacta: '18/06/2026 09:15', estadoDatos: 'Actualizado' },
  { id: 5, nombre: 'Embalse El Yeso', zona: 'Cuenca del Maipo', region: 'Metropolitana', fuente: 'Red Hidrométrica Municipal', temperatura: 8.9, precipitacion: 7.2, caudal: 18.5, nivelAgua: 2.41, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 28 min', ultimaActualizacionExacta: '18/06/2026 09:02', estadoDatos: 'Actualizado' },
  { id: 6, nombre: 'Río Elqui Centro', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'DGA', temperatura: 20.2, precipitacion: 1.8, caudal: 14.7, nivelAgua: 0.82, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 12 min', ultimaActualizacionExacta: '18/06/2026 09:18', estadoDatos: 'Actualizado' },
  { id: 7, nombre: 'CEAZA Vicuña', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Centro CEAZA', temperatura: 20.6, precipitacion: 1.5, caudal: 13.9, nivelAgua: 0.76, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 18 min', ultimaActualizacionExacta: '18/06/2026 09:12', estadoDatos: 'Actualizado' },
  { id: 8, nombre: 'Elqui Agrícola Norte', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Empresa privada agrícola', temperatura: 21.1, precipitacion: 1.2, caudal: 12.8, nivelAgua: 0.69, variablesMonitoreadas: ['Temperatura', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Ayer 18:20', ultimaActualizacionExacta: '17/06/2026 18:20', estadoDatos: 'Desactualizado' },
  { id: 9, nombre: 'Paihuano Cordillera', zona: 'Valle del Elqui', region: 'Coquimbo', fuente: 'Red Agroclimática INIA', temperatura: 18.4, precipitacion: 2.1, caudal: 10.6, nivelAgua: 0.58, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal'], ultimaActualizacion: 'Hace 35 min', ultimaActualizacionExacta: '18/06/2026 08:55', estadoDatos: 'Actualizado' },
  { id: 10, nombre: 'Llanquihue Puerto Varas', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'DGA', temperatura: 11.9, precipitacion: 18.6, caudal: 78.1, nivelAgua: 3.18, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 10 min', ultimaActualizacionExacta: '18/06/2026 09:20', estadoDatos: 'Actualizado' },
  { id: 11, nombre: 'Universidad Austral Lago', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Universidad Austral', temperatura: 12.3, precipitacion: 20.1, caudal: 81.4, nivelAgua: 3.34, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 22 min', ultimaActualizacionExacta: '18/06/2026 09:08', estadoDatos: 'Actualizado' },
  { id: 12, nombre: 'Operador Turístico Sur', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Empresa privada turística', temperatura: 11.5, precipitacion: 0, caudal: 0, nivelAgua: 0, variablesMonitoreadas: ['Temperatura', 'Nivel hidrométrico'], ultimaActualizacion: 'Sin registro reciente', ultimaActualizacionExacta: 'Sin fecha disponible', estadoDatos: 'Sin datos' },
  { id: 13, nombre: 'Frutillar Bajo', zona: 'Lago Llanquihue', region: 'Los Lagos', fuente: 'Redes Universitarias', temperatura: 12.1, precipitacion: 17.9, caudal: 74.8, nivelAgua: 3.05, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 16 min', ultimaActualizacionExacta: '18/06/2026 09:14', estadoDatos: 'Actualizado' },
  { id: 14, nombre: 'Aconcagua Los Andes', zona: 'Valle del Aconcagua', region: 'Valparaíso', fuente: 'DGA', temperatura: 16.5, precipitacion: 3.2, caudal: 27.4, nivelAgua: 1.21, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 11 min', ultimaActualizacionExacta: '18/06/2026 09:19', estadoDatos: 'Actualizado' },
  { id: 15, nombre: 'Putaendo Agrícola', zona: 'Valle del Aconcagua', region: 'Valparaíso', fuente: 'Empresa privada agrícola', temperatura: 17.3, precipitacion: 2.7, caudal: 19.8, nivelAgua: 0.93, variablesMonitoreadas: ['Temperatura', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 41 min', ultimaActualizacionExacta: '18/06/2026 08:49', estadoDatos: 'Actualizado' },
  { id: 16, nombre: 'Embalse Los Aromos', zona: 'Valle del Aconcagua', region: 'Valparaíso', fuente: 'Red Hidrométrica Municipal', temperatura: 15.8, precipitacion: 3.9, caudal: 21.6, nivelAgua: 1.47, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Ayer 21:05', ultimaActualizacionExacta: '17/06/2026 21:05', estadoDatos: 'Desactualizado' },
  { id: 17, nombre: 'Biobío Alto', zona: 'Cuenca del Biobío', region: 'Biobío', fuente: 'DGA', temperatura: 10.8, precipitacion: 14.4, caudal: 96.2, nivelAgua: 2.87, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 7 min', ultimaActualizacionExacta: '18/06/2026 09:23', estadoDatos: 'Actualizado' },
  { id: 18, nombre: 'Laja Salto del Laja', zona: 'Cuenca del Biobío', region: 'Biobío', fuente: 'Redes Universitarias', temperatura: 11.4, precipitacion: 13.8, caudal: 88.5, nivelAgua: 2.63, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 19 min', ultimaActualizacionExacta: '18/06/2026 09:11', estadoDatos: 'Actualizado' },
  { id: 19, nombre: 'Ralco Cordillera', zona: 'Cuenca del Biobío', region: 'Biobío', fuente: 'Operador energético', temperatura: 9.6, precipitacion: 16.7, caudal: 104.9, nivelAgua: 3.12, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 52 min', ultimaActualizacionExacta: '18/06/2026 08:38', estadoDatos: 'Actualizado' },
  { id: 20, nombre: 'Cautín Temuco', zona: 'Río Cautín', region: 'La Araucanía', fuente: 'DGA', temperatura: 9.9, precipitacion: 22.3, caudal: 64.7, nivelAgua: 2.08, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 9 min', ultimaActualizacionExacta: '18/06/2026 09:21', estadoDatos: 'Actualizado' },
  { id: 21, nombre: 'Imperial Nueva Imperial', zona: 'Río Cautín', region: 'La Araucanía', fuente: 'Redes Universitarias', temperatura: 10.6, precipitacion: 24.1, caudal: 71.3, nivelAgua: 2.24, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal'], ultimaActualizacion: 'Hace 33 min', ultimaActualizacionExacta: '18/06/2026 08:57', estadoDatos: 'Actualizado' },
  { id: 22, nombre: 'Villarrica Lago', zona: 'Río Cautín', region: 'La Araucanía', fuente: 'Empresa privada turística', temperatura: 8.7, precipitacion: 26.5, caudal: 58.8, nivelAgua: 2.71, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel hidrométrico'], ultimaActualizacion: 'Sin registro reciente', ultimaActualizacionExacta: 'Sin fecha disponible', estadoDatos: 'Sin datos' },
  { id: 23, nombre: 'Copiapó Tierra Amarilla', zona: 'Río Copiapó', region: 'Atacama', fuente: 'DGA', temperatura: 23.4, precipitacion: 0.4, caudal: 5.8, nivelAgua: 0.37, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 14 min', ultimaActualizacionExacta: '18/06/2026 09:16', estadoDatos: 'Actualizado' },
  { id: 24, nombre: 'Caldera Costera', zona: 'Río Copiapó', region: 'Atacama', fuente: 'Red Hidrométrica Municipal', temperatura: 19.8, precipitacion: 0.2, caudal: 3.1, nivelAgua: 0.24, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 46 min', ultimaActualizacionExacta: '18/06/2026 08:44', estadoDatos: 'Actualizado' },
  { id: 25, nombre: 'Faena Atacama Interior', zona: 'Río Copiapó', region: 'Atacama', fuente: 'Empresa privada minera', temperatura: 24.1, precipitacion: 0, caudal: 4.4, nivelAgua: 0.31, variablesMonitoreadas: ['Temperatura', 'Caudal'], ultimaActualizacion: 'Ayer 17:45', ultimaActualizacionExacta: '17/06/2026 17:45', estadoDatos: 'Desactualizado' },
  { id: 26, nombre: 'Baker Cochrane', zona: 'Cuenca del Baker', region: 'Aysén', fuente: 'DGA', temperatura: 5.6, precipitacion: 31.2, caudal: 312.5, nivelAgua: 4.76, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 6 min', ultimaActualizacionExacta: '18/06/2026 09:24', estadoDatos: 'Actualizado' },
  { id: 27, nombre: 'Lago General Carrera', zona: 'Cuenca del Baker', region: 'Aysén', fuente: 'Redes Universitarias', temperatura: 4.9, precipitacion: 28.7, caudal: 286.1, nivelAgua: 4.42, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 27 min', ultimaActualizacionExacta: '18/06/2026 09:03', estadoDatos: 'Actualizado' },
  { id: 28, nombre: 'Puerto Bertrand', zona: 'Cuenca del Baker', region: 'Aysén', fuente: 'Operador turístico local', temperatura: 5.2, precipitacion: 33.9, caudal: 298.4, nivelAgua: 4.58, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 1 h', ultimaActualizacionExacta: '18/06/2026 08:30', estadoDatos: 'Actualizado' },
  { id: 29, nombre: 'Loa Calama', zona: 'Río Loa', region: 'Antofagasta', fuente: 'DGA', temperatura: 18.6, precipitacion: 0.1, caudal: 6.7, nivelAgua: 0.45, variablesMonitoreadas: ['Temperatura', 'Precipitación', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 13 min', ultimaActualizacionExacta: '18/06/2026 09:17', estadoDatos: 'Actualizado' },
  { id: 30, nombre: 'San Pedro de Atacama', zona: 'Río Loa', region: 'Antofagasta', fuente: 'Red Agroclimática INIA', temperatura: 16.9, precipitacion: 0, caudal: 2.9, nivelAgua: 0.28, variablesMonitoreadas: ['Temperatura', 'Caudal', 'Nivel hidrométrico'], ultimaActualizacion: 'Hace 39 min', ultimaActualizacionExacta: '18/06/2026 08:51', estadoDatos: 'Actualizado' },
];


const perfilesInviernoPorRegion = {
  Antofagasta: { temperatura: 14, precipitacion: 0.05, caudal: 1.02, nivelAgua: 1.01 },
  Atacama: { temperatura: 15, precipitacion: 0.12, caudal: 1.04, nivelAgua: 1.02 },
  Coquimbo: { temperatura: 11.5, precipitacion: 1.8, caudal: 1.08, nivelAgua: 1.04 },
  Valparaíso: { temperatura: 10.5, precipitacion: 5.8, caudal: 1.16, nivelAgua: 1.08 },
  Metropolitana: { temperatura: 8.8, precipitacion: 6.8, caudal: 1.2, nivelAgua: 1.09 },
  Biobío: { temperatura: 7.6, precipitacion: 17, caudal: 1.28, nivelAgua: 1.13 },
  'La Araucanía': { temperatura: 6.8, precipitacion: 24, caudal: 1.32, nivelAgua: 1.16 },
  'Los Lagos': { temperatura: 6.5, precipitacion: 29, caudal: 1.35, nivelAgua: 1.18 },
  Aysén: { temperatura: 2.8, precipitacion: 34, caudal: 1.3, nivelAgua: 1.16 },
};

const offsetsActualizacionMinutos = {
  1: 5, 2: 8, 3: 3, 4: 15, 5: 28, 6: 12, 7: 18, 8: 190, 9: 35, 10: 10,
  11: 22, 12: null, 13: 16, 14: 11, 15: 41, 16: 310, 17: 7, 18: 19, 19: 52,
  20: 9, 21: 33, 22: null, 23: 14, 24: 46, 25: 550, 26: 6, 27: 27, 28: 60, 29: 13, 30: 39,
};

function redondear(valor, decimales = 1) {
  return Number(valor.toFixed(decimales));
}

function obtenerFactorEstacional(fecha = new Date()) {
  const mes = fecha.getMonth();
  if ([5, 6, 7].includes(mes)) return { temperatura: -1.2, precipitacion: 1.25, caudal: 1.12 };
  if ([4, 8].includes(mes)) return { temperatura: 0, precipitacion: 1.05, caudal: 1.05 };
  if ([11, 0, 1].includes(mes)) return { temperatura: 6.5, precipitacion: 0.45, caudal: 0.82 };
  return { temperatura: 2.5, precipitacion: 0.8, caudal: 0.95 };
}

function variacionDeterministica(id, dia, amplitud) {
  return (((id * 37 + dia * 17) % 100) / 100 - 0.5) * amplitud;
}

function calcularFechaActualizacion(offsetMinutos, ahora = new Date()) {
  if (!Number.isFinite(offsetMinutos)) return null;
  return new Date(ahora.getTime() - offsetMinutos * 60 * 1000);
}

function formatearFechaActualizacion(fecha) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) return 'Sin fecha disponible';
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(fecha).replace(',', '');
}

function formatearTiempoRelativo(fecha, ahora = new Date()) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) return 'Sin registro reciente';
  const minutos = Math.max(0, Math.floor((ahora.getTime() - fecha.getTime()) / 60000));
  if (minutos < 60) return `Hace ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  return `Hace ${horas} h${horas > 1 ? 's' : ''}`;
}

function calcularEstadoDatos(fecha, ahora = new Date()) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) return 'Sin datos';
  const horas = (ahora.getTime() - fecha.getTime()) / 36e5;
  if (horas < 2) return 'Actualizado';
  if (horas <= 8) return 'Desactualizado';
  return 'Sin datos';
}

function aplicarSimulacionEstacional(estacion, ahora = new Date()) {
  const perfil = perfilesInviernoPorRegion[estacion.region] ?? { temperatura: estacion.temperatura, precipitacion: estacion.precipitacion, caudal: 1, nivelAgua: 1 };
  const estacional = obtenerFactorEstacional(ahora);
  const diaAnual = Math.floor((ahora - new Date(ahora.getFullYear(), 0, 0)) / 86400000);
  const esCordilleraOSur = /Cordillera|Embalse El Yeso|Baker|Llanquihue|Villarrica|Ralco/i.test(estacion.nombre) || ['Aysén', 'Los Lagos'].includes(estacion.region);
  const lluviaVariable = Math.max(0, perfil.precipitacion * estacional.precipitacion + variacionDeterministica(estacion.id, diaAnual, perfil.precipitacion * 0.9));
  const lluviaAcumuladaReciente = lluviaVariable + Math.max(0, lluviaVariable * 0.55 + variacionDeterministica(estacion.id + 7, diaAnual - 1, perfil.precipitacion * 0.5));
  const respuestaHidrica = lluviaAcumuladaReciente * (['Antofagasta', 'Atacama'].includes(estacion.region) ? 0.01 : 0.035);
  const fechaActualizacion = calcularFechaActualizacion(offsetsActualizacionMinutos[estacion.id], ahora);

  return {
    ...estacion,
    temperatura: redondear(perfil.temperatura + estacional.temperatura + variacionDeterministica(estacion.id, diaAnual, esCordilleraOSur ? 4.5 : 3), 1),
    precipitacion: redondear(lluviaVariable, 1),
    caudal: estacion.variablesMonitoreadas.includes('Caudal') ? redondear(estacion.caudal * perfil.caudal * estacional.caudal + respuestaHidrica, 1) : 0,
    nivelAgua: estacion.variablesMonitoreadas.includes('Nivel hidrométrico') ? redondear(estacion.nivelAgua * perfil.nivelAgua + respuestaHidrica * 0.018, 2) : 0,
    ultimaActualizacion: formatearTiempoRelativo(fechaActualizacion, ahora),
    ultimaActualizacionExacta: formatearFechaActualizacion(fechaActualizacion),
    estadoDatos: calcularEstadoDatos(fechaActualizacion, ahora),
  };
}

export function obtenerEstacionesSimuladas(fecha = new Date()) {
  return estacionesBase.map((estacion) => aplicarSimulacionEstacional(estacion, fecha));
}

export const estaciones = obtenerEstacionesSimuladas();

export const fuentesIntegradas = [
  { nombre: 'DGA', disponible: true },
  { nombre: 'Universidad de Chile', disponible: true },
  { nombre: 'Redes Universitarias', disponible: true },
  { nombre: 'Centro CEAZA', disponible: true },
  { nombre: 'Red Agroclimática INIA', disponible: true },
  { nombre: 'Red Hidrométrica Municipal', disponible: true },
  { nombre: 'Empresa Privada Minera', disponible: false },
  { nombre: 'Operadores privados', disponible: false },
];

export const zonasComparacion = ['Cuenca del Maipo', 'Valle del Elqui', 'Lago Llanquihue', 'Valle del Aconcagua', 'Cuenca del Biobío', 'Río Cautín', 'Río Copiapó', 'Cuenca del Baker', 'Río Loa'];

function formatearActualizacionGeneral(fecha = new Date()) {
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(fecha).replace(',', ' ·');
}

export const metricasResumen = {
  totalEstaciones: estaciones.length,
  fuentesIntegradas: new Set(estaciones.map((estacion) => estacion.fuente)).size,
  variablesDisponibles: variablesDisponibles.length,
  ultimaActualizacionGeneral: formatearActualizacionGeneral(),
};
