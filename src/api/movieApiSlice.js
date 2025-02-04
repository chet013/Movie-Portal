import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY } from './constants';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    endpoints: (builder) => ({
        getMovies: builder.mutation({
            query: (searchTerm) => `?apikey=${API_KEY}&s=${searchTerm}`,
        }),
        getFilm: builder.query({
            query: (id) => `?i=${id}&apikey=${API_KEY}`,
        }),
    }),
});

export const { useGetMoviesMutation, useGetFilmQuery } = movieApi;