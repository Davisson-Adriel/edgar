const inquirer = require("inquirer");
const chalk = require("chalk");

const menu = async () => {
  console.clear();
  console.log(chalk.bold.blue("\n==== SISTEMA DE TAREAS - Don Edgar ====\n"));

  const preguntas = [
    {
      type: "list",
      name: "opcion",
      message: "¿Qué deseas hacer?",
      choices: [
        { value: "1", name: "1. Crear nueva tarea" },
        { value: "2", name: "2. Listar tareas" },
        { value: "3", name: "3. Marcar tarea como completada" },
        { value: "4", name: "4. Eliminar tarea" },
        { value: "5", name: "5. Buscar tarea por palabra clave" },
        { value: "0", name: "0. Salir" },
      ],
    },
  ];

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const leerDescripcion = async () => {
  const { desc } = await inquirer.prompt([
    {
      type: "input",
      name: "desc",
      message: "Descripción de la tarea:",
      validate(value) {
        if (value.trim().length === 0)
          return "¡La descripción no puede estar vacía!";
        return true;
      },
    },
  ]);
  return desc;
};

const confirmar = async (mensaje) => {
  const { ok } = await inquirer.prompt([
    { type: "confirm", name: "ok", message: mensaje },
  ]);
  return ok;
};

const seleccionarTarea = async (tareas, mensaje = "Seleccione tarea:") => {
  const choices = tareas.map((t) => ({
    value: t.id,
    name: `${t.descripcion} (${
      t.completado ? chalk.green("✔") : chalk.red("✖")
    })`,
  }));
  const { id } = await inquirer.prompt([
    { type: "list", name: "id", message: mensaje, choices },
  ]);
  return id;
};

const leerKeyword = async () => {
  const { keyword } = await inquirer.prompt([
    {
      type: "input",
      name: "keyword",
      message: "Palabra clave para buscar:",
    },
  ]);
  return keyword;
};

module.exports = {
  menu,
  leerDescripcion,
  confirmar,
  seleccionarTarea,
  leerKeyword,
};
