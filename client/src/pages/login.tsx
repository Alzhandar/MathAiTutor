import { useState } from 'react';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="space-y-4">
        <h1 className="text-2xl font-bold">Логин</h1>
        {error && <p className="text-red-500">{error}</p>}
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Логин</button>
        <p className="text-center">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-blue-500">Создать аккаунт</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;


