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
    addFormData: (state, action) => {
      state.forms.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
