import styled from "styled-components";
import * as Colors from '../res/colors';
import { useDispatch, useSelector } from "react-redux";
import { removeCompletedTodos } from "../features/todo/todoSlice";
import DeleteSVG from '../delete.svg';

const DeleteModal = ({ setShowDeleteModal }) => {
    const todos = useSelector((state) => state.todo.value);
    let numCompletedTodos = useSelector((state) => state.todo.completeToDos);
    const dispatch = useDispatch();
    

   
    return (<ModalContainer>
        <ModalContent>
            
            {/* <DeleteSVG /> */}
            <img src={DeleteSVG} alt={`remove img`}></img>

            <ModalTitle>Are you sure about that?</ModalTitle>
            <TextParagraph>Completed tasks will be removed</TextParagraph>
            <RemoveButton onClick={(e) => {dispatch(removeCompletedTodos({idx: todos.length - numCompletedTodos, count: numCompletedTodos})); setShowDeleteModal(false)}}>Remove</RemoveButton>
            <CancelButton onClick={(e) => {setShowDeleteModal(false)}}>Cancel</CancelButton>

        </ModalContent>
        </ModalContainer>)
}


const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.34);
    backdrop-filter: blur(16px);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: ${Colors.WHITE};
    width: 83%;
    max-width: 25rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    box-sizing: border-box;
`;

const ModalTitle = styled.p`
    font-size: 1.2rem;
    white-space: nowrap;
    font-weight: 600;
`;

const CancelButton = styled.button`
    border: none;
    color: #7D7D7D;
    font-size: 1.2rem;
    background: none;
    font-weight: 600;
    margin-bottom: 1rem;
    &:hover{
    cursor: pointer;
  }
    
`;


const RemoveButton = styled.button`
    border-radius: 8px;
    color: ${Colors.WHITE};
    font-size: 1rem;
    background-color: ${Colors.RED};
    font-weight: 600;
    letter-spacing: 1px;
    border: none;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    &:hover{
    cursor: pointer;
  }
`;

const TextParagraph = styled.p`
    color: #7D7D7D;
    white-space: nowrap;
    flex: 1;
`;
export default DeleteModal;