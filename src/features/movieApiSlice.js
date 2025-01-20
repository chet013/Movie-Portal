import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'acdfa7c6';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://www.omdbapi.com/' }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (searchTerm = 'Batman') => `?apikey=${API_KEY}&s=${searchTerm}`,
        }),
    }),
});

export const { useGetMoviesQuery } = movieApi;