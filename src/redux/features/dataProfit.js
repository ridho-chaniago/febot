import { createSlice } from '@reduxjs/toolkit';

const dataProfitSlice = createSlice({
  name: 'dataProfit',
  initialState: [], // Awalnya kosong
  reducers: {
    setDataProfit: (state, action) => {
      return action.payload; // Mengubah state dengan data dari payload
    },
  },
});

export const { setDataProfit } = dataProfitSlice.actions;
export default dataProfitSlice.reducer;
