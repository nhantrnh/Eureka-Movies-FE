
import { createSlice } from "@reduxjs/toolkit"; 


export const Actors = createSlice({
    name: 'actor',
    initialState: {
        page: 1,
        searchQuery: '',
        maxPerPage: 20,
        actorlistID: '',
    },
    reducers: {
        selectList: (state, action)=>{
            state.searchQuery = '';
        },
        searchActor: (state, action)=>{
            state.searchQuery = action.payload;
        },
        selectActor: (state, action)=>{
            state.actorlistID = action.payload;
        }
        
    },
});

export const { searchActor, selectActor, selectList } = Actors.actions;

export default Actors.reducer;
