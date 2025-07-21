import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { loginUser } from '../services/loginService';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await loginUser(email, password);

    if (result.success) {
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/Dashboard');
    } else {
      setError(result.message || 'Login failed.');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col '>
      <div className="flex items-center justify-center min-h-screen  bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Task-Nest</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-black text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Login
            </button>

            {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
