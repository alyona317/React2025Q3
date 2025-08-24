import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

type FormDataType = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;

};

type FormState = {
  forms: FormDataType[];
};

const initialState: FormState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormDataType>) => {
      state.forms.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
