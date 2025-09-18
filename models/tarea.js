const _ = require('lodash');

class Tarea {
  constructor(descripcion) {
    this.id = _.uniqueId('tarea_');
    this.descripcion = descripcion;
    this.completado = false;
    this.fechaCreacion = new Date().toISOString();
  }
}

module.exports = Tarea;