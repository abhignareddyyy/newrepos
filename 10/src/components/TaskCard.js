import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, deleteTask, setEditingTask }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Assigned:</strong> {task.assignedTo}</p>
          <div className="btn-group">
            <button onClick={() => setEditingTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;