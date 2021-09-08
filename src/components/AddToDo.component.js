import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { add } from '../features/todo/todoSlice';
import * as Colors from '../res/colors';
import AddToDoSVG from '../AddIdeaIcon.svg';

function isEmpty(str) {
    return (!str || str.trim().length === 0 );
}
const AddToDo = ({inputToDoText, setInputToDoText, showAddToDoInput, setShowAddToDoInput}) => {
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
    return(
        <Container>
            {isSignedIn && !showAddToDoInput && <AddToDoButton onClick={(e) => setShowAddToDoInput(true)}>
            <Img src={AddToDoSVG} alt={`add svg`}></Img>
            <p>Add an idea</p>
            </AddToDoButton>}
           {showAddToDoInput && isSignedIn &&
            <AddToDoDiv>
              <ToDoInput 
                    type='text' 
                    placeholder="write your idea!" 
                    onChange={(e) => setInputToDoText(e.target.value)}
                    value={inputToDoText}>
                </ToDoInput>
                <AddButton onClick={(e) => {if (!isEmpty(inputToDoText)) {dispatch(add({text: inputToDoText.trim(), isCompleted: false})); setInputToDoText(``); setShowAddToDoInput(false)}}}>Add</AddButton>
                <CancelButton onClick={(e) => {setInputToDoText(``); setShowAddToDoInput(false)}}>Cancel</CancelButton>
            </AddToDoDiv>}
         
        </Container>
    )
}

const Container = styled.div`
    margin: 1rem 0;
`;

const AddToDoButton = styled.button`
    background-color: ${Colors.NAV_BAR_GREEN};
    font-size: 1.2rem;
    color: ${Colors.WHITE};
    padding: 0 1.5rem;
    border-radius: 8px;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
`;

const Img = styled.img`
    margin-right: .5rem;
`;

const AddToDoDiv = styled.div`
    display: flex;
    width: 100%;
    height: 3.5rem;
    border: none;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    border-radius: 8px;
`;

const ToDoInput = styled.input`
    flex: 1;
    border: none;
    padding-left: .5rem;
    font-size: 1rem;
`;

const AddButton = styled.button`
    background-color: ${Colors.NAV_BAR_GREEN};
    color: ${Colors.WHITE};
    padding: 0 1rem;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    &:hover{
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
    background-color: #C7C7C7;
    color: ${Colors.BLACK};
    border: none;
    padding: 0 1rem;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    &:hover{
    cursor: pointer;
  }
`;
export default AddToDo;