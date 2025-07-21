import { useState } from "react";
import { updateTaskStatus } from "../services/taskService";

export default function useTaskEdit(task, onSuccess) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false);
    setTitle(task.title);
    setDesc(task.description);
    setDueDate(task.due_date);
  };

  const handleSave = async () => {
    const result = await updateTaskStatus(task.id, {
      title,
      description: desc,
      due_date: dueDate,
    });

    if (result?.success) {
      setIsEditing(false);
      if (onSuccess) onSuccess(); // Refresh parent
    }
  };

  return {
    isEditing,
    title,
    desc,
    dueDate,
    setTitle,
    setDesc,
    setDueDate,
    startEditing,
    cancelEditing,
    handleSave,
  };
}
