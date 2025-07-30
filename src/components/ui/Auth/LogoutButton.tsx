import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'antd'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button
      className="mr-2"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      style={{ padding: 8 }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
