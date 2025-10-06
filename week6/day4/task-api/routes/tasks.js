import express from "express";
import fs from "fs-extra";
import path from "path";

const router = express.Router();
const filePath = path.join("data", "tasks.json");

// Helper function to read tasks
const readTasks = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Failed to read tasks file");
  }
};

// Helper function to write tasks
const writeTasks = async (tasks) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw new Error("Failed to write tasks file");
  }
};

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const tasks = await readTasks();
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description,
      completed: false
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;

    await writeTasks(tasks);

    res.json(tasks[taskIndex]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));

    if (newTasks.length === tasks.length)
      return res.status(404).json({ error: "Task not found" });

    await writeTasks(newTasks);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
