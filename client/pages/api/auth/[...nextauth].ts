import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials: Record<string, string> | undefined) => {
        if (!credentials) return null;
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });
          const user = res.data;
          if (user) {
            return user;
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any, user: any }) => {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
