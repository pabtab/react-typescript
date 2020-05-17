import React, { useState, useRef } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    if (newTask) {
      addTask(newTask);
      setNewTask("");
    }
    taskInput.current?.focus()
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (key: number) => {
    const newTasks: ITask[] = [...tasks];

    newTasks[key].done = !newTasks[key].done;

    setTasks(newTasks);
  };

  const removeTask = (key: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(key, 1)
    setTasks(newTasks)
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  ref={taskInput}
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, key: number) => (
            <div className="card card-body mt-2" key={key.toString()}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(key)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(key)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
