import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { themeTokens, type ThemeTokens } from './theme-tokens'

type ThemeName = 'default'

interface ThemeState {
  currentTheme: ThemeName
  tokens: ThemeTokens
}

const initialState: ThemeState = {
  currentTheme: 'default',
  tokens: themeTokens,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      state.currentTheme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
