import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'; // contoh slice
import dataCoinReducer from './features/dataCoin';
import dataHistoryReducer from './features/dataHistory';
import dataProfitReducer from './features/dataProfit';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dataCoin: dataCoinReducer,
    dataHistory: dataHistoryReducer,
    dataProfit: dataProfitReducer
  }
});
