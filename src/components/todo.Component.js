import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../features/todo/todoSlice';
import ToDoItem from './toDoItem.Component';
import { v4 as uuidv4 } from 'uuid';
import { setToDoList, setUser } from '../utils/localStorageManagment';
import { signIn, signOut } from '../features/user/userSlice';

const mock_user = {
    username: `bob`,
    password: `123`,
    email: `bob@gmail.com`
};

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

    useEffect(() => {
        setUser(user);
    }, [user])
    
    return (
        <div>
            {isSignedIn ? 
            <div>
                Hello {user.username}
                <button onClick={(e) => dispatch(signOut())}>Sign Out</button>
            </div>
            :
            <div>
            <div>
                You are not connected
            </div>
            <button onClick={(e) => dispatch(signIn(mock_user))}>Log In</button>
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