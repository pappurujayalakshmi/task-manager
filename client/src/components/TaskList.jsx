import TaskCard from "./TaskCard";

const TaskList = ({ tasks, loading, onDelete, onEdit, onToggle }) => {
  if (loading) return <div className="status-msg">⏳ Loading tasks...</div>;
  if (!tasks.length) return <div className="status-msg">No tasks yet. Add one above! 🚀</div>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;
