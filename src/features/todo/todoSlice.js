import { createSlice } from '@reduxjs/toolkit';
import { getToDoList } from '../../utils/localStorageManagment';

export const todoSlice = createSlice({
    name: `todo`,
    initialState: {
        value: getToDoList(),
    },
    reducers: {
        add: (state, action) => {
            state.value.splice(0,0, action.payload);
        },
        remove: (state, action) => {
            state.value.splice(action.payload, 1);
        },
        edit: (state, action) => {
            state.value.splice(action.payload.idx, 1, {...action.payload.todo, text: action.payload.editedToDo});
        },
        complete: (state, action) => {
            state.value.splice(action.payload.idx, 1, {...action.payload.todo, isCompleted: true});
        }
    },
});

export const { add, remove, edit, complete } = todoSlice.actions;

export default todoSlice.reducer;

