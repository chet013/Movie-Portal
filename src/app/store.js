import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../features/movieApiSlice';

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
});