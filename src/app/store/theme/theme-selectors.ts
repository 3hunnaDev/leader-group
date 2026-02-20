import type { RootState } from '../store'

export const selectThemeName = (state: RootState) => state.theme.currentTheme
export const selectThemeTokens = (state: RootState) => state.theme.tokens
