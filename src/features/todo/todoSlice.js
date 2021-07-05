import { createSlice } from '@reduxjs/toolkit';
import { getToDoList, getNumCompletedToDos } from '../../utils/localStorageManagment';

export const todoSlice = createSlice({
    name: `todo`,
    initialState: {
        value: getToDoList(),
        completeToDos: getNumCompletedToDos(),
    },
    reducers: {
        add: (state, action) => {
            state.value.splice(0,0, action.payload);
        },
        remove: (state, action) => {
            state.value.splice(action.payload.idx, 1);
            if (action.payload.todo.isCompleted)
                state.completeToDos--;
        },
        edit: (state, action) => {
            state.value.splice(action.payload.idx, 1, {...action.payload.todo, text: action.payload.editedToDo});
        },
        complete: (state, action) => {
            state.value.splice(action.payload.idx, 1, {...action.payload.todo, isCompleted: true});
            state.completeToDos++;
        },
        swap: (state, action) => {
            let res = [...state.value];
            let aux = res[action.payload.idx1];
            res[action.payload.idx1] = res[action.payload.idx2];
            res[action.payload.idx2] = aux;
            state.value = res;
        },
        removeCompletedTodos: (state, action) => {
            state.value.splice(action.payload.idx, action.payload.count);
            state.completeToDos -= action.payload.count;
        },
    },
});

export const { add, remove, edit, complete, swap, removeCompletedTodos } = todoSlice.actions;

export default todoSlice.reducer;

