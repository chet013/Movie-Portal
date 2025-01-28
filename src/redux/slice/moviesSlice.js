import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state, action) {
            state.list = action.payload;
        },
    },
});

export const { setMovies, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;