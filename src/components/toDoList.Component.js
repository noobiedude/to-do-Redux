import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../features/todo/todoSlice';
import ToDoItem from './toDoItem.Component';
import { v4 as uuidv4 } from 'uuid';
import { setToDoList } from '../utils/localStorageManagment';


const ToDoList = () => {
    const todos = useSelector((state) => state.todo.value);
    const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [inputToDoText, setInputToDoText] = useState('');
    
    useEffect(() => {
        console.log(todos);
        setInputToDoText('');
        setToDoList(todos);
    }, [todos]);

   
    
    return (
        <div>
            <div>
                {todos.length === 0 ? 
                <div>
                    No todos yet
                </div> 
                : 
                <div>{todos.map((todo, idx) => {
                    const uniqueKey = uuidv4();
                    return(
                    <ToDoItem key={uniqueKey} todo={todo} idx={idx} id={uniqueKey}></ToDoItem>
                    );
                })}</div>}
            </div>
        </div>
    )
}

export default ToDoList;