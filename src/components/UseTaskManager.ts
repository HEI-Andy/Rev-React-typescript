import { nanoid } from "nanoid";
import { useState } from "react";

export interface Task {
 id: string;
 title: string;
}

const useTaskManager = () => {
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
   addTask,
   updateTask,
   completeTask,
   handleSearch,
   filteredTasks,
   setTitle
  };
};

export default useTaskManager;
