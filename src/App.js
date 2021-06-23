import styled from 'styled-components';
import './App.css';
import NavBar from './components/NavBar.Component';
import ToDoList  from './components/toDoList.Component';
import * as Colors from './res/colors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { add } from './features/todo/todoSlice';

function App() {
  const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
  const [showAddToDoInput, setShowAddToDoInput] = useState(false);
  const [inputToDoText, setInputToDoText] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Container>
      <NavBar setShowAddToDoInput={setShowAddToDoInput} setInputToDoText={setInputToDoText}></NavBar>
      <ToDoContainer>
        <TitleSection>
          <Title>My todos</Title>
          {isSignedIn && !showAddToDoInput && <AddToDo onClick={(e) => setShowAddToDoInput(true)}>+</AddToDo>}
        </TitleSection>
        <AddToDoSection> {showAddToDoInput && isSignedIn &&
            <div>
              <input 
                    type='text' 
                    placeholder="add your todo here!" 
                    onChange={(e) => setInputToDoText(e.target.value)}
                    value={inputToDoText}>
                </input>
                <button onClick={(e) => {dispatch(add({text: inputToDoText, isCompleted: false})); setInputToDoText(``); setShowAddToDoInput(false)}}>Add</button>
                <button onClick={(e) => {setInputToDoText(``); setShowAddToDoInput(false)}}>Cancel</button>
            </div>}
         </AddToDoSection>
        <ToDoList></ToDoList>
      </ToDoContainer>
      </Container>
      
    </div>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ToDoContainer = styled.div`
  margin-top: 2rem;
  padding: 0 1rem;
  background-color: ${Colors.BACKGROUND_COLOR_MAIN};
  border-radius: 16px 16px 0 0;
  flex: 1;
`;

const Title = styled.p`
  font-size: 1.5rem;
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;

`;

const AddToDo = styled.button`
  border-radius: 100%;
  height: 60px;
  width: 60px;
  margin-top: 1rem;
  background-color: #C4C4C4;
  border: none;
  font-size: 2rem;
`;

const AddToDoSection = styled.section`
  margin: 1rem 0;
`;
export default App;
