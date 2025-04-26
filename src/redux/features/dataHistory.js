import { createSlice } from '@reduxjs/toolkit';

const dataHistorySlice = createSlice({
  name: 'dataHistory',
  initialState: [], // Awalnya kosong
  reducers: {
    setDataHistory: (state, action) => {
      return action.payload; // Mengubah state dengan data dari payload
    },
  },
});

export const { setDataHistory } = dataHistorySlice.actions;
export default dataHistorySlice.reducer;
