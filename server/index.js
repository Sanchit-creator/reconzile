const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/project-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task model
const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  assignedPerson: String,
  status: String,
});

const Task = mongoose.model('Task', TaskSchema);

app.use(cors())

// Create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    dueDate: req.body.dueDate,
    assignedPerson: req.body.assignedPerson,
    status: 'Open',
  });

  await task.save();

  res.json(task);
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

// Get a single task
app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.json(task);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.name = req.body.name;
  task.description = req.body.description;
  task.dueDate = req.body.dueDate;
  task.assignedPerson = req.body.assignedPerson;
  task.status = req.body.status;

  await task.save();

  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  await Task.deleteOne({ _id: req.params.id });

  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});