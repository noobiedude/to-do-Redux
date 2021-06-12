import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: `todo`,
    initialState: {
        value: []
    },
    reducers: {
        add: (state, action) => {
            state.value.splice(0,0, action.payload);
        },
        remove: (state, action) => {
            state.value.splice(action.payload, 1);
        },
        edit: (state, action) => {
            state.value.splice(action.payload.idx, 1, action.payload.editedToDo);
        },
    },
});

export const { add, remove, edit } = todoSlice.actions;

export default todoSlice.reducer;

