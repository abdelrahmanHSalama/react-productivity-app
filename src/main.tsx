import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import '@ant-design/v5-patch-for-react-19'

import App from './App.tsx'
import UiProvider from './services/context/UiProvider.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-kqm5wq7wjxywyzjb.us.auth0.com"
      clientId="MOKx8KgKJn8VhE7TI2vXUaBIh7RsTViA"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <UiProvider>
        <App />
      </UiProvider>
    </Auth0Provider>
  </StrictMode>
)
