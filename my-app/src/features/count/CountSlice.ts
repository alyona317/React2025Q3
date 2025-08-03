import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  checkedCount: number;
}

const initialState: CounterState = {
  checkedCount: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.checkedCount += 1;
    },
    decrement: (state) => {
      state.checkedCount -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.checkedCount = action.payload;
    },
    resetCount: (state) => {
      state.checkedCount = 0;
    },
  },
});

export const { increment, decrement, setCount, resetCount } =
  counterSlice.actions;
export const counterReducer = counterSlice.reducer;
