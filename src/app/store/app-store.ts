import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../../features/counter/model/counter-slice'

export const appStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
