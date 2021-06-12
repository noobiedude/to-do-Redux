import { remove, edit } from '../features/todo/todoSlice';
import { useDispatch } from 'react-redux'
import {useState} from 'react';

const ToDoItem = ({ todo, idx }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState(todo);
    return(
        <div>
            <input type={text} value={text} onChange={(e) => setText(e.target.value)}></input>
            <button onClick={(e) => dispatch(remove(idx))}>Delete</button>
            <button onClick={e => dispatch(edit({idx: idx, editedToDo: text}))}>Edit</button>
        </div>
    )
}

export default ToDoItem;