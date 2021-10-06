require("colors")
const Task = require("./Task")

class Tasks {
   constructor() {
      this.tasks = {}
   }

   parseTaskToString(task) {
      const { description, finishedOn } = task
      const state = finishedOn ? `${finishedOn}`.green : "Pendiente".red
      return `${description} ${"||".red} ${state}`
   }

   createTask(description) {
      const task = new Task(description)
      this.tasks[task.id] = task
   }

   getList() {
      const taskArray = []
      Object.values(this.tasks).forEach(task => taskArray.push(task))
      return taskArray
   }

   chargeTasksFromArray(JSONtasks = []) {
      JSONtasks.forEach(JSONtask => {
         const { id } = JSONtask
         this.tasks[id] = JSONtask
      })
   }

   getInfoAllTask() {
      return Object.values(this.tasks).map((task, index) => {
         return `${(index + 1).toString().green}. ${this.parseTaskToString(task)}`
      })
   }

   toggleTasksStates(idList = [String()]) {
      Object.values(this.tasks).forEach(task => {
         if (idList.includes(task.id)) {
            if (!task.finishedOn) task.finishedOn = new Date().toString()
         } else task.finishedOn = null
      })
   }

   getInfoTasksFilteredByState(completed = true) {
      return Object.values(this.tasks)
         .filter(task => {
            const { finishedOn } = task
            return completed ? finishedOn !== null : finishedOn === null
         })
         .map((task, index) => `${(index + 1).toString().green}. ${this.parseTaskToString(task)}`)
   }

   deleteTask(id = "") {
      if (this.tasks[id]) delete this.tasks[id]
   }
}

module.exports = Tasks
