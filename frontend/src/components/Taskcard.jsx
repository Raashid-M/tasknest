import { useState } from "react";
import { updateTaskStatus, deleteTask } from "../services/taskService";
import useTaskEdit from "../hooks/useTaskEdit";

function Taskcard({ id, title, time, desc, status, onStatusChange }) {
  const isDone = status === "done";
  const isOverdue = status === 'overdue' && new Date(time) < new Date();


  const task = { id, title, description: desc, due_date: time };
  const {
    isEditing,
    title: editTitle,
    desc: editDesc,
    dueDate,
    setTitle,
    setDesc,
    setDueDate,
    startEditing,
    cancelEditing,
    handleSave,
  } = useTaskEdit(task, onStatusChange);

  const toggleStatus = async () => {
    const newStatus = isDone ? "pending" : "done";
    const result = await updateTaskStatus(id, { status: newStatus });
    if (result?.success) onStatusChange();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const result = await deleteTask(id);
    if (result?.success) onStatusChange();
  };

  return (
    <div
      onClick={() => {
        if (!isEditing) toggleStatus();
      }}
      className={`px-5 py-3 w-full rounded-xl shadow mb-5 cursor-pointer transition-all duration-200 ${
        isDone ? "bg-gray-200 text-gray-500 line-through" : ""
      } ${isOverdue ? "bg-red-100 border border-red-500" : "bg-[#f9f9f9] hover:bg-[#f3f3f3]"}`}
    >
      <div className="flex justify-between items-start">
        {isEditing ? (
          <div className="flex flex-col w-full gap-2">
            <input
              className="text-lg font-bold px-2 py-1 rounded border"
              value={editTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="text-sm px-2 py-1 rounded border"
              value={editDesc}
              rows={2}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
            />
            <input
              type="date"
              className="text-sm border rounded px-2 py-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <div className="flex gap-2 mt-1">
              <button className="text-white bg-blue-600 px-2 py-1 rounded text-sm" onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}>
                Save
              </button>
              <button className="text-white bg-gray-600 px-2 py-1 rounded text-sm" onClick={(e) => {
                e.stopPropagation();
                cancelEditing();
              }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className={`font-bold text-lg ${isDone ? "text-gray-500" : ""}`}>{title}</h3>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm">{time}</p>
                {isOverdue && <span className="text-red-600 text-xs font-semibold">🔴</span>}
                {isDone && <i className="bi bi-check-circle-fill text-green-600"></i>}
              </div>
              <div className="flex gap-1">
                <button
                  className="px-2 shadow text-gray hover:bg-gray-200 cursor-pointer rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing();
                  }}
                >
                  <i className="bi bi-pencil-fill text-gray-400"></i>
                </button>
                <button
                  className="px-2 shadow text-red-400 hover:bg-red-100 cursor-pointer rounded"
                  onClick={handleDelete}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {!isEditing && <p className="text-sm">{desc}</p>}
    </div>
  );
}

export default Taskcard;
