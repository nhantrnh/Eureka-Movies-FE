
import { createSlice } from "@reduxjs/toolkit"; 


export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
        maxPerPage: 20,
        generalId: '',
        type: ''
    },
    reducers: {
        selectGenreOrCategory: (state, action)=>{
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = '';
            state.type = '';
            if (state.genreIdOrCategoryName === 'TrendingDay'){
                state.maxPerPage = 10;
            }
        },
        searchMovie: (state, action)=>{
            state.searchQuery = action.payload;
            state.type = '';
        },
        selectGenre: (state, action)=>{
            state.generalId = action.payload;
            state.type = '';
        },
        searchMovieLLM: (state, action)=>{
            state.searchQuery = action.payload;
            state.type = 'LLM'; 
        }
    },
});

export const { selectGenreOrCategory, searchMovie, selectGenre, searchMovieLLM } = genreOrCategory.actions;

export default genreOrCategory.reducer;
