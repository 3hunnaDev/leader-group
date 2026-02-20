import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from './theme/theme-slice'

export const rootReducer = combineReducers({
  theme: themeReducer,
})
