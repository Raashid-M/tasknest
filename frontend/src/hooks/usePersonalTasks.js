import { useEffect, useState } from 'react';
import { getPersonalTasks } from '../services/taskService';

const usePersonalTasks = (refreshKey = 0) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) return;

    const fetchTasks = async () => {
      const data = await getPersonalTasks(userId);
      setTasks(data);
    };

    fetchTasks();
  }, [refreshKey]);

  return tasks;
};

export default usePersonalTasks;
