const TareasController = require('./controllers/tareasController');
const { menu, leerDescripcion, confirmar, seleccionarTarea, leerKeyword } = require('./helpers/menu');
const chalk = require('chalk');

const tareas = new TareasController();

const mostrarTareas = (listado) => {
  if (listado.length === 0) {
    console.log(chalk.yellow('\n ¡No hay tareas para mostrar!\n'));
    return;
  }
  listado.forEach((t, i) => {
    const estado = t.completado ? chalk.green('✔ Completada') : chalk.red('✖ Pendiente');
    console.log(`${chalk.cyan(i + 1)}. ${t.descripcion} [${estado}] - ${chalk.gray(t.fechaCreacion)}`);
  });
};

const main = async () => {
  let opt = '';
  do {
    opt = await menu();

    switch (opt) {
      case '1':
        const desc = await leerDescripcion();
        const nueva = tareas.crearTarea(desc);
        if (nueva) console.log(chalk.green('\nTarea creada correctamente!\n'));
        else console.log(chalk.red('\nNo se pudo crear la tarea.\n'));
        break;

      case '2':
        const agrupadas = tareas.agruparPorEstado();
        console.log(chalk.bold('\nPendientes:'));
        mostrarTareas(agrupadas.pendientes || []);
        console.log(chalk.bold('\nCompletadas:'));
        mostrarTareas(agrupadas.completadas || []);
        break;

      case '3':
        const pendientes = tareas.listarTareas({ estado: 'pendientes' });
        if (pendientes.length === 0) {
          console.log(chalk.yellow('\nNo hay tareas pendientes.\n'));
          break;
        }
        const idComp = await seleccionarTarea(pendientes, 'Selecciona la tarea a completar:');
        const okComp = await confirmar('¿Seguro que quieres marcar como completada?');
        if (okComp && tareas.completarTarea(idComp)) console.log(chalk.green('\n¡Tarea completada!\n'));
        else console.log(chalk.red('\nNo se pudo completar la tarea.\n'));
        break;

      case '4':
        const todas = tareas.listarTareas();
        if (todas.length === 0) {
          console.log(chalk.yellow('\nNo hay tareas para eliminar.\n'));
          break;
        }
        const idDel = await seleccionarTarea(todas, 'Selecciona la tarea a eliminar:');
        const okDel = await confirmar('¿Seguro que quieres eliminar la tarea?');
        if (okDel && tareas.eliminarTarea(idDel)) console.log(chalk.green('\n¡Tarea eliminada!\n'));
        else console.log(chalk.red('\nNo se pudo eliminar la tarea.\n'));
        break;

      case '5':
        const keyword = await leerKeyword();
        const resultados = tareas.buscarTareas(keyword);
        console.log(chalk.bold('\nResultados de búsqueda:'));
        mostrarTareas(resultados);
        break;
    }

    if (opt !== '0') await new Promise(r => setTimeout(r, 1500));
  } while (opt !== '0');
  console.log(chalk.blue('\n¡Hasta la próxima, Don Edgar!\n'));
};

main();