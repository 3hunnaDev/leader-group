import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { AppRoot } from '@/app-root'
import { store } from '@/app/store/store'
import { selectThemeTokens } from '@/app/store/theme/theme-selectors'
import { applyThemeTokensToDocument } from '@/app/store/theme/theme-tokens'
import './index.css'

function applyCurrentTheme() {
  const tokens = selectThemeTokens(store.getState())
  applyThemeTokensToDocument(tokens)
}

applyCurrentTheme()
store.subscribe(applyCurrentTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoot />
    </Provider>
  </StrictMode>,
)
