import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../features/todo/todoSlice';
import ToDoItem from './toDoItem.Component';
import { v4 as uuidv4 } from 'uuid';

const ToDo = () => {
    const todos = useSelector((state) => state.todo.value);
    const dispatch = useDispatch();
    const [inputToDoText, setInputToDoText] = useState('');
    
    useEffect(() => {
        console.log(todos);
        setInputToDoText('');
    }, [todos]);
    
    return (
        <div>
            <div>
                <input 
                    type='text' 
                    placeholder="add your todo here!" 
                    onChange={(e) => setInputToDoText(e.target.value)}
                    value={inputToDoText}>
                </input>
                <button onClick={(e) => dispatch(add(inputToDoText))}>Add</button>
            </div>
            <div>
                {todos.length === 0 ? 
                <div>
                    No todos yet
                </div> 
                : 
                <div>{todos.map((todo, idx) => {
                    return(
                    <ToDoItem key={uuidv4()} todo={todo} idx={idx}></ToDoItem>
                    );
                })}</div>}
            </div>
        </div>
    )
}

export default ToDo;