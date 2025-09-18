const _ = require('lodash');
const Tarea = require('../models/tarea');
const { guardarTareas, cargarTareas } = require('../utils/archivo');

class TareasController {
  constructor() {
    // Cargar tareas al iniciar
    this.tareas = cargarTareas();
    // Eliminar duplicados por id (Lodash)
    this.tareas = _.uniqBy(this.tareas, 'id');
  }

  crearTarea(descripcion) {
    if (_.isEmpty(descripcion.trim())) return false;
    const nuevaTarea = new Tarea(descripcion);
    this.tareas.push(nuevaTarea);
    guardarTareas(this.tareas);
    return nuevaTarea;
  }

  listarTareas({ estado = 'todas', orden = 'desc' } = {}) {
    let listado = this.tareas;
    if (estado === 'completadas') listado = _.filter(listado, { completado: true });
    if (estado === 'pendientes') listado = _.filter(listado, { completado: false });
    // Ordenar por fecha usando Lodash
    listado = _.orderBy(listado, ['fechaCreacion'], [orden]);
    return listado;
  }

  completarTarea(id) {
    const tarea = _.find(this.tareas, { id });
    if (tarea && !tarea.completado) {
      tarea.completado = true;
      guardarTareas(this.tareas);
      return true;
    }
    return false;
  }

  eliminarTarea(id) {
    const antes = this.tareas.length;
    this.tareas = _.filter(this.tareas, tarea => tarea.id !== id);
    guardarTareas(this.tareas);
    return this.tareas.length < antes;
  }

  buscarTareas(keyword) {
    return _.filter(this.tareas, tarea => _.includes(_.toLower(tarea.descripcion), _.toLower(keyword)));
  }

  agruparPorEstado() {
    return _.groupBy(this.tareas, tarea => (tarea.completado ? 'completadas' : 'pendientes'));
  }
}

module.exports = TareasController;