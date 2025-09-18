const fs = require('fs');
const path = require('path');

const archivoPath = path.join(__dirname, '../data/tareas.json');

const guardarTareas = (tareas) => {
  fs.writeFileSync(archivoPath, JSON.stringify(tareas, null, 2));
};

const cargarTareas = () => {
  if (!fs.existsSync(archivoPath)) return [];
  const info = fs.readFileSync(archivoPath, { encoding: 'utf-8' });
  return info ? JSON.parse(info) : [];
};

module.exports = { guardarTareas, cargarTareas };