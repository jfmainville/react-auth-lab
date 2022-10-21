import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        userDisplayName: "",
        userEmailAddress: ""
    },
    reducers: {
        validate (state, action) {
            const userDisplayName = action.payload.displayName;
            const userEmailAddress = action.payload.emailAddress;

            if (userEmailAddress) {
                state.isAuthenticated = true;
                state.userDisplayName = userDisplayName;
                state.userEmailAddress = userEmailAddress;
            }
        },
        authenticate (state, action) {
            const userDisplayName = action.payload.displayName;
            const userEmailAddress = action.payload.emailAddress;

            if (userEmailAddress) {
                state.isAuthenticated = true;
                state.userDisplayName = userDisplayName;
                state.userDisplayName = userEmailAddress;
            }
        },
        logout (state) {
            state.isAuthenticated = false;
            state.userDisplayName = "";
            state.userEmailAddress = "";
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice;
