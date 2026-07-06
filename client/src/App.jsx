import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/api";
import "./App.css";

const App = () => {
  const [tasks, setTasks]           = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading]       = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage]       = useState({ text: "", type: "" });

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch {
      showMessage("Failed to load tasks.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleSubmit = async (form) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        const { data } = await updateTask(editingTask._id, form);
        setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
        showMessage("Task updated successfully!");
        setEditingTask(null);
      } else {
        const { data } = await createTask(form);
        setTasks((prev) => [data, ...prev]);
        showMessage("Task created successfully!");
      }
    } catch (err) {
      showMessage(err.response?.data?.message || "Operation failed.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showMessage("Task deleted.");
    } catch {
      showMessage("Failed to delete task.", "error");
    }
  };

  const handleToggle = async (task) => {
    try {
      const { data } = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      showMessage(`Task marked as ${data.completed ? "completed" : "pending"}.`);
    } catch {
      showMessage("Failed to update task.", "error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
          loading={formLoading}
        />
        <h2 className="section-title">
          All Tasks <span className="task-count">{tasks.length}</span>
        </h2>
        <TaskList
          tasks={tasks}
          loading={loading}
          onDelete={handleDelete}
          onEdit={setEditingTask}
          onToggle={handleToggle}
        />
      </main>
    </>
  );
};

export default App;
