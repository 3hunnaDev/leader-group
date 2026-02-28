import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store/app-store'

type CounterState = {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1
    },
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { decrement, increment, incrementByAmount } = counterSlice.actions
export const counterReducer = counterSlice.reducer
export const selectCounterValue = (state: RootState) => state.counter.value
