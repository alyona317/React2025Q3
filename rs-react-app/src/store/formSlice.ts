import type { FormDataType } from '@components/types/FormDataType';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
    addForm: (state, action: PayloadAction<FormDataType>) => {
      state.forms.push(action.payload);
    },
    clearForms: (state) => {
      state.forms = [];
    },
  },
});

export const { addForm, clearForms } = formSlice.actions;
export default formSlice.reducer;
