const inquirer = require("inquirer")
const Task = require("../models/Task")
require("colors")

const menuOptions = [
   {
      type: "list",
      name: "option",
      message: "¿Qué desea hacer?",
      choices: [
         {
            value: "1",
            name: `${"1.".green} Crear tarea`
         },
         {
            value: "2",
            name: `${"2.".green} Listar tarea`
         },
         {
            value: "3",
            name: `${"3.".green} Listar tareas completas`
         },
         {
            value: "4",
            name: `${"4.".green} Listar tareas pendientes`
         },
         {
            value: "5",
            name: `${"5.".green} Completar tarea`
         },
         {
            value: "6",
            name: `${"6.".green} Borrar Tarea`
         },
         {
            value: "0",
            name: `${"0.".red} Salir`
         }
      ]
   }
]

const showMenu = async () => {
   console.clear()
   const { option: optionSelected } = await inquirer.prompt(menuOptions)
   return optionSelected
}

const selectTaskToDelete = async (tasks = [new Task()]) => {
   const { id } = await inquirer.prompt([
      {
         type: "list",
         name: "id",
         message: "Borrar",
         choices: tasks.map((task, index) => {
            return {
               value: task.id,
               name: `${(index + 1).toString().green}. ${task.description}`
            }
         })
      }
   ])
   return id
}

const selectTaskToComplete = async (tasks = [new Task()]) => {
   const { idList } = await inquirer.prompt([
      {
         type: "checkbox",
         name: "idList",
         message: "Selecciones",
         choices: tasks.map((task, index) => {
            return {
               value: task.id,
               name: `${(index + 1).toString().green}. ${task.description}`,
               checked: task.finishedOn ? true : false
            }
         })
      }
   ])
   return idList
}

const confirm = async message => {
   const { ok } = await inquirer.prompt([
      {
         type: "confirm",
         name: "ok",
         message
      }
   ])
   return ok
}

const readInput = async message => {
   const { description } = await inquirer.prompt([
      {
         type: "input",
         name: "description",
         message,
         validate(value) {
            return value.length === 0 ? "Por favor ingrese un valor" : true
         }
      }
   ])
   return description
}

const pause = async () => {
   return await inquirer.prompt([
      {
         type: "input",
         name: "inputToContinue",
         message: `presiona ${"ENTER".green} para continuar`
      }
   ])
}

module.exports = {
   showMenu,
   pause,
   readInput,
   selectTaskToDelete,
   selectTaskToComplete,
   confirm
}
