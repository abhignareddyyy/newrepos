import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function TaskColumn({ status, tasks, deleteTask, setEditingTask }) {
  return (
    <div className="column">
      <h2>{status}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;