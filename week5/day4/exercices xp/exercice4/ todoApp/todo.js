// todo.js
export class TodoList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push({ task, completed: false });
    }
  
    markComplete(index) {
      if (this.tasks[index]) {
        this.tasks[index].completed = true;
      }
    }
  
    listTasks() {
      return this.tasks.map((t, i) => {
        return `${i + 1}. ${t.task} - ${t.completed ? "✅ Done" : "❌ Not done"}`;
      });
    }
  }
  