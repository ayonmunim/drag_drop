import { configureStore } from '@reduxjs/toolkit';

import {pictureSlice} from './pictureSlice';

const store = configureStore({
  reducer: {
    pictureItem:pictureSlice.reducer
  }
});

export default store; // Export the store


