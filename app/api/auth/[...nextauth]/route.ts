import NextAuth from 'next-auth/next'
import { NextAuthOptions, User } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

interface CustomUser extends User {
  id: string
  name: string
  phone: string
  role: string
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: 'Phone', type: 'phone' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          id: 'any_id',
          phone: '98982045774',
          password: '12345678',
          name: 'John Doe',
          role: 'admin',
        }

        const isValidPhone = user.phone === credentials?.phone
        const isValidPassword = user.password === credentials?.password

        if (!isValidPhone || !isValidPassword) {
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      const customUser = user as CustomUser

      if (user) {
        return {
          ...token,
          phone: customUser.phone,
          role: customUser.role,
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: { name: token.name, phone: token.phone, role: token.role },
      }
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
