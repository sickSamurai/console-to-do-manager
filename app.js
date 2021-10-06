require("colors")
const { saveFile, readFile } = require("./helpers/dao")
const {
   showMenu,
   pause,
   readInput,
   selectTaskToDelete,
   confirm,
   selectTaskToComplete
} = require("./helpers/inquirer")
const Task = require("./models/Task")
const Tasks = require("./models/Tasks")

function save(tasks = new Tasks()) {
   saveFile(JSON.stringify(tasks.getList()))
}

const main = async () => {
   let optionSelected = ""
   const tasks = new Tasks()
   const JSONtasks = readFile()
   if (JSONtasks) tasks.chargeTasksFromArray(JSONtasks)
   do {
      optionSelected = await showMenu()
      switch (optionSelected) {
         case "1":
            const description = await readInput("Descripción")
            tasks.createTask(description)
            save(tasks)
            break
         case "2":
            for (let task of tasks.getInfoAllTask()) console.log(task)
            break
         case "3":
            for (let task of tasks.getInfoTasksFilteredByState(true)) console.log(task)
            break
         case "4":
            for (let task of tasks.getInfoTasksFilteredByState(false)) console.log(task)
            break
         case "5":
            let idList = await selectTaskToComplete(tasks.getList())
            tasks.toggleTasksStates(idList)
            save(tasks)
            break
         case "6":
            let id = await selectTaskToDelete(tasks.getList())
            let isSure = await confirm(`¿Estas seguro de que quieres borrar la tarea?`)
            if (isSure) {
               tasks.deleteTask(id)
               save(tasks)
            }
            break
         case "0":
            break
      }
      if (optionSelected !== "0") await pause()
   } while (optionSelected !== "0")
}

console.clear()
main()
