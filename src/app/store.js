
import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB.js";
import { eureka } from "../services/eureka.js";

import genreOrCategoryReducer from './../features/currentGenreOrCategory.js'
import  useReducer from "./../features/auth.js";

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        [eureka.reducerPath]: eureka.reducer,
        curruntGenreOrCategory: genreOrCategoryReducer,
        user: useReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware, eureka.middleware), // Add RTK-Query middleware here
});
