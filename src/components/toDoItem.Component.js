import { remove, edit, complete, swap } from '../features/todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux'
import {useState} from 'react';
import styled from 'styled-components';
import * as Colors from '../res/colors';
import CheckIcon from '@material-ui/icons/Check';

const ToDoItem = ({ todo, idx, id, setShowModal, setIdxModal }) => {
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
    const [text, setText] = useState(todo.text);
    const len = useSelector((state) => state.todo.value.length);
    const completedToDos = useSelector((state) => state.todo.completeToDos);

    return(
        <ToDoContainer isCompleted={todo.isCompleted} borderColor={Colors.COMPLETED_GREEN}>
            {todo.isCompleted && <CompletedDiv>Completed</CompletedDiv>}
            <ToDoText>
            {isSignedIn ? 
            // <input type={text} value={text} onChange={(e) => setText(e.target.value)}></input> 
            <p onClick={(e) => {setIdxModal(idx); setShowModal(true)}} >{text}</p> 
            :
            <p>{text}</p>
            }
            </ToDoText>
            {isSignedIn ? 
            <span>
                <CompleteButton onClick={(e) => {dispatch(complete({idx, todo})); dispatch(swap({idx1: idx, idx2: len - 1 - completedToDos}))}}><CheckIcon></CheckIcon></CompleteButton>
                <button onClick={(e) => dispatch(remove({idx, todo}))}>Delete</button>
                <button onClick={e => dispatch(edit({idx, todo, editedToDo: text}))}>Edit</button>
            </span>
            :
            ``
            }
        </ToDoContainer>
    )
}

const ToDoContainer = styled.div`
    background-color: ${Colors.WHITE};
    height: 3rem;
    color: ${Colors.TEXT_COLOR};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    filter: drop-shadow(4px 8px 4px rgba(0, 0, 0, 0.25));
    position: relative;
    border-radius: 8px;
    border: ${(props) => props.isCompleted ? `2px solid ${props.borderColor}` : `none`};
    justify-content: space-between;
`;

const ToDoText = styled.div`
    padding-left: 1rem;
    flex: 1;
`;

const CompletedDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    font-size: .8rem;
    background-color: ${Colors.COMPLETED_GREEN};
    color: ${Colors.WHITE};
    border-radius: 8px 8px 8px 0;
    padding: 0 1rem;
`;

const CompleteButton = styled.button`
    height: 3rem;
    border-radius: 0 8px 8px 0;
    background-color: ${Colors.COMPLETED_GREEN};
    color: ${Colors.WHITE};
    border: none;
    
`;
export default ToDoItem;