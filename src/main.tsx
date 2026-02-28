import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './app/providers/store-provider'
import App from './app/app'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
