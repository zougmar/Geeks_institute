// app.js
import { TodoList } from "./todo.js";

const myTodos = new TodoList();

// Add tasks
myTodos.addTask("Finish JavaScript exercise");
myTodos.addTask("Review ES6 modules");
myTodos.addTask("Go for a walk");

// Mark one task complete
myTodos.markComplete(1);

// List all tasks
console.log("My Todo List:");
console.log(myTodos.listTasks().join("\n"));
