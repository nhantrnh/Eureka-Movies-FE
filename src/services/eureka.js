
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const eureka = createApi({
    reducerPath: 'eureka',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL1 }),
    endpoints: (builder)=>({

        // * Get Genres
        getGenres: builder.query({
            query: ()=> `/genre/movie/list?api_key=${tmdbApiKey}`
        }),

        //* Get User Specific Lists
        getList: builder.query({
            query: ({listName, accountId, sessionId, page}) => 
                `/account/${accountId}/${listName}?page=${page}&session_id=${sessionId}&api_key=${tmdbApiKey}`
        }),
        
        getRecommendations: builder.query({
            query: ({ movie_id, list })=> `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),

        getActorsDetails: builder.query({
            query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
        }),

        getMoviesByActorId: builder.query({
            query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),


    }),
});

export const { 
    useGetGenresQuery, 
    useGetListQuery, 
    useGetRecommendationsQuery, 
    useGetActorsDetailsQuery, 
    useGetMoviesByActorIdQuery, 
} = eureka;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

// export const eurekaApi = createApi({
//     reducerPath: 'eurekaApi',
//     baseQuery: fetchBaseQuery({ baseUrl}),
//     endpoints: (builder)=>({


//         getMoviesTrendingDay: builder.query({
//             query: ({pageNumber, maxPerPage})=> `/Movie/TrendingDay/TrendingDay?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`
//         }),

//         getMoviesTrendingWeek: builder.query({
//             query: ({pageNumber, maxPerPage})=> `/Movie/TrendingWeek/TrendingWeek?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`
//         }),

//         getMoviesPopular: builder.query({
//             query: ({pageNumber, maxPerPage})=> `/Movie/Popular?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`
//         }),

//         getMovieDetail: builder.query({
//             query: (tmdbId)=> `/Movie/Detail/${tmdbId}`
//         }),

//         getMoviesLastedTrailers: builder.query({
//             query: ({pageNumber, maxPerPage})=> `/Movie/LastedTrailers?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`   
//         }),

//         getMovies: builder.query({
//             query: ({ keyword, generalId, pageNumber, maxPerPage }) => {
//                 if (keyword === null && generalId === null) {
//                     return `/Movie/Movies?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`;
//                 } else if (keyword !== null && generalId === null) {
//                     return `/Movie/Movies?Keyword=${keyword}&PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`;
//                 } else if (keyword === null && generalId !== null) {
//                     return `/Movie/Movies?GeneralId=${generalId}&PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`;
//                 } else {
//                     return `/Movie/Movies?Keyword=${keyword}&GeneralId=${generalId}&PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`;
//                 }
//             }
//         }),
        
        

//     }),
// });

// export const { 
//     useGetMoviesTrendingDayQuery,
//     useGetMoviesTrendingWeekQuery,
//     useGetMoviesPopularQuery,
//     useGetMovieDetailQuery,
//     useGetMoviesLastedTrailersQuery, 
//     useGetMoviesQuery, 
// } = eurekaApi;