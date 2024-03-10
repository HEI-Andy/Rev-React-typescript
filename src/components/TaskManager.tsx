import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";

interface Task {
  id: string;
  title: string;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle('');
  };

  const updateTask = (taskId: string, taskUpdate: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...taskUpdate } : task)));
  };

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks,
    title,
    searchKeyword,
    setTitle,
    setSearchKeyword,
    addTask,
    updateTask,
    completeTask,
    handleSearch,
    filteredTasks,
  };
};

export const TaskManager = () => {
  const { tasks, title, searchKeyword, filteredTasks, ...taskFunctions } = useTasks();

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={taskFunctions.handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
      <input type="text" value={title} onChange={(e) => taskFunctions.setTitle(e.target.value)} placeholder="Add new task" />
        <button onClick={taskFunctions.addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task: Task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => taskFunctions.updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => taskFunctions.completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
