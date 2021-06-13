import { remove, edit } from '../features/todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux'
import {useState} from 'react';

const ToDoItem = ({ todo, idx, id }) => {
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
    const [text, setText] = useState(todo);
    return(
        <div>
            {isSignedIn ? 
            <input type={text} value={text} onChange={(e) => setText(e.target.value)}></input> 
            :
            <p>{text}</p>
            }
            {isSignedIn ? 
            <span>
                <button onClick={(e) => dispatch(remove(idx))}>Delete</button>
                <button onClick={e => dispatch(edit({idx: idx, editedToDo: text}))}>Edit</button>
            </span>
            :
            ``
            }
        </div>
    )
}

export default ToDoItem;