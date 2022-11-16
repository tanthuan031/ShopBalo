import { createSlice } from '@reduxjs/toolkit';

export const shopClientReducer = createSlice({
  name: 'shopClient',
  initialState: {
    categoryId: undefined,
    fillterPriceStart: undefined,
    fillterPriceEnd: undefined,
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setFillterPriceStart: (state, action) => {
      state.fillterPriceStart = action.payload;
    },
    setFillterPriceEnd: (state, action) => {
      state.fillterPriceEnd = action.payload;
    },
  },
});

export const { setCategoryId, setFillterPriceStart, setFillterPriceEnd } = shopClientReducer.actions;

export default shopClientReducer.reducer;
