import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../utils/localStorageManagment';
export const userSlice = createSlice({
    name: `user`,
    initialState: {
        value: getUser(),
    },
    reducers: {
        signIn: (state, action) => {
            state.value.username = action.payload.username;
            state.value.password = action.payload.password;
            state.value.email =action.payload.email;
            state.value.isSignedIn = true;
        },
        signOut: (state) => {
            state.value = {};
            state.value.isSignedIn = false;
        },
    },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;

