import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@app/app'
import { StoreProvider } from '@app/providers/store-provider'
import '@shared/config/i18n'
import './index.css'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
