import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      axios.get<User>('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch(() => router.push('/login'));
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
          <p>Email: {user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
            className="w-full p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
