import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import ToDoItem from './toDoItem.Component';
import { v4 as uuidv4 } from 'uuid';
import { setToDoList } from '../utils/localStorageManagment';
import Modal from './Modal.component';

const ToDoList = () => {
    const todos = useSelector((state) => state.todo.value);
    const [showModal, setShowModal] = useState(false);
    const [idxModal, setIdxModal] = useState(undefined);
    useEffect(() => {
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
                    <ToDoItem key={uniqueKey} todo={todo} idx={idx} id={uniqueKey} setShowModal={setShowModal} setIdxModal={setIdxModal}></ToDoItem>
                    );
                })}</div>}
                {showModal && <Modal idxModal={idxModal}></Modal>}
            </div>
        </div>
    )
}

export default ToDoList;