import { configureStore } from '@reduxjs/toolkit';
import folderReducer from '../features/folder/folderSlice';

const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
});

export default store;
