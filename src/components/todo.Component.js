import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../features/todo/todoSlice';
import ToDoItem from './toDoItem.Component';
import { v4 as uuidv4 } from 'uuid';
import { setToDoList } from '../utils/localStorageManagment';


const ToDo = () => {
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
            {isSignedIn ? 
            <div>
                Hello {user.username}
                
            </div>
            :
            <div>
            <div>
                You are not connected
            </div>
           
            </div>
            }
            {isSignedIn ? <div>
                <input 
                    type='text' 
                    placeholder="add your todo here!" 
                    onChange={(e) => setInputToDoText(e.target.value)}
                    value={inputToDoText}>
                </input>
                <button onClick={(e) => dispatch(add(inputToDoText))}>Add</button>
            </div>
            :
            <p>You can only view Todos. If you want to create one you must sign in</p>}
            <h3>ToDo</h3>
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

export default ToDo;