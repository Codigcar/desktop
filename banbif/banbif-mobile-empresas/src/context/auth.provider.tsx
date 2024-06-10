import { createContext, useCallback, useContext, useState } from 'react'
import StudentEntity from './student.entity'

type Props = {
  children: any
}

interface Context {
  isAuthenticated: boolean | undefined
  signIn: (user: StudentEntity) => void
  signOut: () => void
  user: StudentEntity | undefined
}

const AuthContext = createContext<Context>({} as Context)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<StudentEntity>()

  const signIn = (user: StudentEntity) => {
    console.log("🚀 -----------------------------------------------------🚀")
    console.log("🚀 ~ file: auth.provider.tsx:22 ~ signIn ~ user:", user)
    console.log("🚀 -----------------------------------------------------🚀")
    setIsAuthenticated(true)
    setUser(user)
  }

  const signOut = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): Context => useContext(AuthContext)
