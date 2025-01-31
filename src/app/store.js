import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/slice/moviesSlice';
import { movieApi } from '../api/movieApiSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
});

export default store;