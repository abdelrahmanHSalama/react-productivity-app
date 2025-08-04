import LoginButton from '@/components/ui/Auth/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="logo">
        Welcome to Task<span className="text-primary">aty</span>
      </p>
      {!isAuthenticated && <LoginButton />}
    </div>
  )
}

export default Home
