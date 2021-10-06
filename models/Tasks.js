const Task = require("./Task")
require("colors")
class Tasks {
   constructor() {
      this.tasks = {}
   }

   parseTaskToString(task) {
      const { description, finishedOn } = task
      const state = finishedOn ? `${finishedOn}`.green : "Pendiente".red
      return `${description} || ${state}`
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

   toggleState(idList = [String()]) {
      idList.forEach(id => {
         if (!this.tasks[id].finishedOn) this.tasks[id].finishedOn = new Date().toString()
      })

      Object.values(this.tasks).forEach(task => {
         if (!idList.includes(task.id)) task.finishedOn = null
      })
   }

   getInfoTasksFilteredByState(completed = true) {
      return Object.values(this.tasks)
         .filter(value => {
            const { finishedOn } = value
            return completed ? finishedOn !== null : finishedOn === null
         })
         .map((task, index) => `${(index + 1).toString().green}. ${this.parseTaskToString(task)}`)
   }

   deleteTask(id = "") {
      if (this.tasks[id]) delete this.tasks[id]
   }
}

module.exports = Tasks
