import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import FilterBar from "./components/FilterBar";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    if (editingTask) {
      await axios.put(`${API_URL}/${editingTask.id}`, {
        ...editingTask,
        ...task
      });
      setEditingTask(null);
    } else {
      await axios.post(API_URL, task);
    }
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId;

    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    await axios.put(`${API_URL}/${taskId}`, {
      ...taskToUpdate,
      status: newStatus
    });

    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || task.status === statusFilter) &&
      (userFilter === "All" || task.assignedTo === userFilter)
    );
  });

  const users = [...new Set(tasks.map((task) => task.assignedTo))];

  return (
    <div className="app">
      <h1>Task Management Dashboard</h1>

      <TaskForm addTask={addTask} editingTask={editingTask} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        userFilter={userFilter}
        setUserFilter={setUserFilter}
        users={users}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {["To Do", "In Progress", "Done"].map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={filteredTasks.filter((task) => task.status === status)}
              deleteTask={deleteTask}
              setEditingTask={setEditingTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;