import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    email: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
            state.isAuthenticated = true;

            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('email', action.payload.email);
        },
        logout: (state) => {
            state.accessToken = null;
            state.email = null;
            state.isAuthenticated = false;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('email');
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.auth;
