import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Главная страница</h1>
      {status === 'loading' ? (
        <p>Загрузка...</p>
      ) : session ? (
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push('/profile')} className="p-2 bg-blue-500 text-white rounded">Профиль</button>
          <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded">Выйти</button>
        </div>
      ) : (
        <button onClick={() => router.push('/login')} className="p-2 bg-blue-500 text-white rounded">Логин</button>
      )}
    </div>
  );
};

export default HomePage;
