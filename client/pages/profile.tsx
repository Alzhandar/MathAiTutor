import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/user/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Загрузка...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Профиль</h1>
      <p className="mt-4">Имя: {user?.username}</p>
      <p className="mt-2">Email: {user?.email}</p>
      <button onClick={() => router.push('/')} className="mt-4 p-2 bg-blue-500 text-white rounded">Назад на главную</button>
    </div>
  );
};

export default ProfilePage;
