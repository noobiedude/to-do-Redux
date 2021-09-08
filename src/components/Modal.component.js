import styled from 'styled-components';
import ToDoItem from './toDoItem.Component';
import { useDispatch, useSelector } from 'react-redux';
import { remove, edit } from '../features/todo/todoSlice';
import { useState } from 'react';
import * as Colors from '../res/colors';

const Modal = ({ idxModal, setShowModal, setIdxModal, setShowAlerts, showAlerts, setJustAttached }) => {
    const todo = useSelector((state) => state.todo.value[idxModal]);
    const dispatch = useDispatch();
    const [text, setText] = useState(todo.text);
    return(
        <Container>
        <ModalInfo>You have selected:</ModalInfo>
        <ToDoItem todo={todo} idx={idxModal} setShowModal={setShowModal} isModal={true} text={text} setText={setText}></ToDoItem>
        <ModalInfo marginTop={`-0.5rem`}>What do you want to do?</ModalInfo>
        <EditButton onClick={e => {dispatch(edit({idx: idxModal, todo, editedToDo: text})); setShowModal(false); setIdxModal(undefined); setShowAlerts({...showAlerts, edit: true})}}>Edit</EditButton>
        <RemoveButton onClick={(e) => {dispatch(remove({idx: idxModal, todo})); setShowModal(false); setIdxModal(undefined); setShowAlerts({...showAlerts, delete: true})}}>Remove</RemoveButton>
        <CancelDiv>
            <CancelButton onClick={(e) => {setShowModal(false); setIdxModal(undefined)}}>Cancel</CancelButton>
        </CancelDiv>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    flex: 1;
`;

const ModalInfo = styled.p`
    align-self: center;
    font-size: 18px;
    margin-top: ${props => props.marginTop ? props.marginTop : ``};
`;

const EditButton = styled.button`
    background-color: ${Colors.WHITE};
    color: ${Colors.EDIT_BUTTON_BLUE};
    border-radius: 8px;
    align-self: center;
    font-size: 1.1rem;
    height: 2rem;
    width: 14rem;
    border: none;
    margin-bottom: 1rem;
    font-weight: 600;
    &:hover{
    cursor: pointer;
  }
`;

const RemoveButton = styled.button`
    background-color: ${Colors.WHITE};
    color: ${Colors.RED};
    border-radius: 8px;
    align-self: center;
    font-size: 1.1rem;
    height: 2rem;
    width: 14rem;
    border: none;
    margin-bottom: 1rem;
    font-weight: 600;
    &:hover{
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
    background-color: ${Colors.BACKGROUND_COLOR_MAIN};
    color: ${Colors.BLACK};
    border-radius: 8px;
    align-self: center;
    font-size: 1.1rem;
    height: 2rem;
    width: 14rem;
    border: none;
    margin-bottom: 1rem;
    font-weight: 600;
    &:hover{
    cursor: pointer;
  }
`;

const CancelDiv = styled.div`
    background-color: ${Colors.WHITE};
    margin: 0 -1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    
`;
export default Modal;