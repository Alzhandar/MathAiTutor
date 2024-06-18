import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      if (response.status === 201) {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="space-y-4">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Создать аккаунт</button>
        <p className="text-center">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-blue-500">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
