import { createSlice } from '@reduxjs/toolkit';

const dataCoinSlice = createSlice({
  name: 'dataCoin',
  initialState: [],
  reducers: {
    setDataCoin: (state, action) => {
      // Update state dengan array koin
      return action.payload; // Set seluruh array koin yang baru
    },
  },
});

export const { setDataCoin} = dataCoinSlice.actions;
export default dataCoinSlice.reducer;
