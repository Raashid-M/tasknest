import { useState } from 'react';
import { createTask } from '../services/taskService';

const useCreateTask = (onSuccess) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!newTask.title || !newTask.due_date) {
      alert('Title and Due Date are required');
      return;
    }

    setLoading(true);
    const result = await createTask({
      ...newTask,
      created_by: user.id,
      assigned_to: user.id,
    });
    setLoading(false);

    if (result?.success) {
      setNewTask({ title: '', description: '', due_date: '' });
      if (onSuccess) onSuccess(); // call refresh
    }
  };

  return {
    newTask,
    setNewTask,
    handleInputChange,
    handleCreate,
    loading,
  };
};

export default useCreateTask;
