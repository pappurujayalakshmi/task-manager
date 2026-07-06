const TaskCard = ({ task, onDelete, onEdit, onToggle }) => {
  const createdAt = new Date(task.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-badge ${task.completed ? "badge-done" : "badge-pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <p className="task-date">📅 Created: {createdAt}</p>

      <div className="task-actions">
        <button className="btn btn-success" onClick={() => onToggle(task)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          ✏️ Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
