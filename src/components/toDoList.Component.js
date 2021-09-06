import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import ToDoItem from './toDoItem.Component';
import { v4 as uuidv4 } from 'uuid';
import { setToDoList } from '../utils/localStorageManagment';
import NoPlanSVG from "../noPlan.svg";
import styled from 'styled-components';
import * as Colors from '../res/colors';

const ToDoList = ({setShowModal, setIdxModal}) => {
    const todos = useSelector((state) => state.todo.value);
    
    useEffect(() => {
        setToDoList(todos);
    }, [todos]);

   
    
    return (
            <Container>
                {todos.length === 0 && 
                <NoPlanContainer>
                    <NoPlanIMG src={NoPlanSVG} alt={`no plan`}></NoPlanIMG>
                    <NoPlanText>No plans yet! </NoPlanText>
                    <NoPlanText2>How about adding an idea?</NoPlanText2>
                </NoPlanContainer> 
                }
                
                {todos.length !== 0 && <ToDoListContainer>
        <TitleSection>
        <Title>Some of my plans:</Title>
      </TitleSection>
                <div>{todos.map((todo, idx) => {
                    const uniqueKey = uuidv4();
                    return(
                    <ToDoItem key={uniqueKey} todo={todo} idx={idx} id={uniqueKey} setShowModal={setShowModal} setIdxModal={setIdxModal}></ToDoItem>
                    );
                })}</div></ToDoListContainer>}
            </Container>
    )
}

const NoPlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;
 const NoPlanIMG = styled.img`
    max-width: 90%;
 `;

 const NoPlanText = styled.p`
    font-size: 2rem;
    margin: 1rem;
    color: ${Colors.TEXT_COLOR};
 `;

 const NoPlanText2 = styled.p`
    font-size: 1.5rem;
    color: ${Colors.TEXT_COLOR};
    margin: 1rem;
    white-space: nowrap;
 `;

 
const TitleSection = styled.section`
display: flex;
justify-content: space-between;
`;

const Title = styled.p`
font-size: 1.5rem;
`;

const Container = styled.div`
    flex: 1;
    display: flex;
`;

const ToDoListContainer = styled.div`
    flex: 1;
    max-width: 100%;
`;
export default ToDoList;