
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder)=>({

        // * Get Genres
        getGenres: builder.query({
            query: ()=> `/genre/movie/list?api_key=${tmdbApiKey}`
        }),

        //* Get Movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, maxPerPage, searchQuery, generalId })=> {

                // Get all movies
                if(genreIdOrCategoryName === 'Home' && !searchQuery && !generalId){
                    return `/Movie/Movies?PageNumber=${page}&MaxPerPage=${maxPerPage}`;
                }

                //* Get Movies by Search
                if(searchQuery){
                    return `/Movie/Movies?Keyword=${searchQuery}&GeneralId=${generalId}&PageNumber=${page}&MaxPerPage=${maxPerPage}`;
                }
                
                //* Get Movies by Category
                if(genreIdOrCategoryName && genreIdOrCategoryName !== 'Home' && typeof genreIdOrCategoryName === 'string') {
                    return  `/Movie/${genreIdOrCategoryName}?PageNumber=${page}&MaxPerPage=${maxPerPage}`;
                }

                //* Get Movies by Genre
                if(!searchQuery && generalId) {
                    return `/Movie/Movies?GeneralId=${generalId}&PageNumber=${page}&MaxPerPage=${maxPerPage}`;
                }

                //* Get Popular Movies
                return `/Movie/Popular?PageNumber=${page}&MaxPerPage=${maxPerPage}`;

            }
        }),

        //* Get Movie
        getMovie: builder.query({
            query: (id)=> `/Movie/Detail/${id}`,
        }),

        getFavoriteMovies: builder.query({
            query: ({page, maxPerPage}) => `/Movie/Favorite?PageNumber=${page}&MaxPerPage=${maxPerPage}`
        }),

        getActingList: builder.query({
            query: ({ actorlistID, searchQuery, page, maxPerPage }) => {
                if (!searchQuery) {
                    return `/People/ActingList?PageNumber=${page}&MaxPerPage=${maxPerPage}`;
                }
                return `/People/ActingList?Keyword=${searchQuery}&PageNumber=${page}&MaxPerPage=${maxPerPage}`;
            }
        }),


        getActingListByFilm: builder.query({
            query: ({ tmdbId }) => `/People/Cast/${tmdbId}`
        }),

        getReviews: builder.query({
            query: ({ tmdbId, page, maxPerPage }) => 
            {
                if (tmdbId) {
                    return `/Rating/GetReviews?TmdbId=${tmdbId}&PageNumber=${page}&MaxPerPage=${maxPerPage}`;
                }
                return `/Rating/GetRatingList?PageNumber=${page}&MaxPerPage=${maxPerPage}`;
            }
        }),

        // http://localhost:5084/api/Recommendation/Navigation?request=h

        getRecommendationNavigation: builder.query({
            query: (request) => `/Recommendation/Navigation?request=${request}`
        }),

        //http://localhost:5084/api/Recommendation/LLMSearch?Collection=user&Query=b&Amount=10&Threshold=11

        getRecommendationLLMSearch: builder.query({
            query: ({ collection, query, amount, threshold }) => `/Recommendation/LLMSearch?Collection=${collection}&Query=${query}&Amount=${amount}&Threshold=${threshold}`
        }),

        getWatchList: builder.query({
            query: ({page, maxPerPage}) => `/WatchList/GetWatchList?PageNumber=${page}&MaxPerPage=${maxPerPage}`
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
    useGetMoviesQuery, 
    useGetMovieQuery, 
    useGetListQuery, 
    useGetRecommendationsQuery, 
    useGetActorsDetailsQuery, 
    useGetMoviesByActorIdQuery, 
    useGetFavoriteMoviesQuery,
    useGetActingListQuery,
    useGetActingListByFilmQuery,
    useGetReviewsQuery,
    useGetRecommendationNavigationQuery,
    useGetRecommendationLLMSearchQuery,
    useGetWatchListQuery,
    useGetTrendingMoviesQuery
} = tmdbApi;


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