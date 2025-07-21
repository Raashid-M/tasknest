import { useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch("http://localhost:8000/tasknest/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();

            if (result.success) {
                navigate('/login');
            } else {
                setError(result.message || 'Signup failed.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='w-full h-screen flex flex-col '>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gray-800 hover:bg-black text-white font-semibold py-2 rounded-md transition duration-200"
                        >
                            Sign Up
                        </button>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
