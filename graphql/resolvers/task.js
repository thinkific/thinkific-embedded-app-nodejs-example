const Task = require('../../models/task');

async function task(args, _) {
  const { id } = args;
  
  try {
    const task = await Task.findById(id).orFail(new Error('Task not found'));

    return task;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function tasks(args, _) {
  const { userId } = args;

  try {
    const tasks = await Task.find({ userId });
    return tasks;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function addTask(args, _) {
  const { description, userId } = args.input;

  try {
    const task = await Task.create({ description, userId });
    return task;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function deleteTask(args, _) {
  const { id } = args;

  try {
    const task = await Task.findByIdAndDelete(id).orFail(
      new Error('Task not found')
    );
    return task;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  addTask,
  deleteTask,
  task,
  tasks,
};
