import { useState } from 'react';
import { createTask } from '../services/taskService';

function NewTaskForm({ onSuccess , onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      due_date: dueDate,
      created_by: user.id,
      assigned_to: user.id,
    };

    const result = await createTask(taskData);
    if (result?.success) {
      onSuccess(); // trigger parent refresh
    }

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="bg-[#f3f3f3] px-5 py-3 w-full rounded-xl shadow mb-5">
      <div className="flex flex-col w-full gap-2">
        <input
          className="text-lg font-bold px-2 py-1 rounded border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="text-sm px-2 py-1 rounded border"
          value={description}
          rows={2}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          className="text-sm border rounded px-2 py-1"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleSubmit}
            className="text-white bg-blue-600 rounded px-2 py-1 text-sm cursor-pointer"
          >
            Create
          </button>
          <button
            onClick={onCancel}
            className="text-white bg-gray-600 rounded px-2 py-1 text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTaskForm;
