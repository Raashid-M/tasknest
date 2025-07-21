import { useEffect, useState } from 'react';
import { getProjects } from '../services/projectService';

const useUserProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) return;

    const fetchProjects = async () => {
      const data = await getProjects(userId);
      setProjects(data.projects || data);
    };

    fetchProjects();
  }, []);

  return projects;
};

export default useUserProjects;
