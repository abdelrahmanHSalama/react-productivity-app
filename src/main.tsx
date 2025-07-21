import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.css'
import '@ant-design/v5-patch-for-react-19'

import App from './App.tsx'
import { ReactQueryProvider } from "./services/context/ReactQueryProvider.tsx"
import UiProvider from "./services/context/UiProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </ReactQueryProvider>
  </StrictMode>
)
