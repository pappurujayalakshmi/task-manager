import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editingTask, onCancelEdit, loading }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  // Populate form when editing a task
  useEffect(() => {
    if (editingTask) setForm({ title: editingTask.title, description: editingTask.description || "" });
    else setForm({ title: "", description: "" });
  }, [editingTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    setForm({ title: "", description: "" });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
      <input
        name="title"
        placeholder="Task title *"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={3}
      />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
