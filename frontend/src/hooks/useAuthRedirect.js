import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, [navigate]);
};

export default useAuthRedirect;
