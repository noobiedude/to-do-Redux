import styled from 'styled-components';
import './App.css';
import NavBar from './components/NavBar.Component';
import ToDoList  from './components/toDoList.Component';
import * as Colors from './res/colors';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { add } from './features/todo/todoSlice';
import Modal from './components/Modal.component';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteModal from './components/DeleteModal.component';

const modalHeight = 350;

function App() {
  const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
  const [showAddToDoInput, setShowAddToDoInput] = useState(false);
  const [inputToDoText, setInputToDoText] = useState('');
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [idxModal, setIdxModal] = useState(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
 
  return (
    <div className="App">
      <AppContainer>
       {showModal ? 
       //background
       <Container> <BlurContainer />
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
        
         <ModalContainer className={`modal-container`}><Modal idxModal={idxModal} setShowModal={setShowModal} setIdxModal={setIdxModal}></Modal></ModalContainer>
     
        <ToDoList setShowModal={setShowModal} setIdxModal={setIdxModal}></ToDoList>
        
        
      </ToDoContainer>
      </Container>
      :
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
        <ToDoList setShowModal={setShowModal} setIdxModal={setIdxModal}></ToDoList>
        {isSignedIn && <RemoveCompletedTasksButton onClick={(e) => {setShowDeleteModal(true)}}> <DeleteIcon style={{marginRight: `.2rem`}}/>Remove completed tasks</RemoveCompletedTasksButton>}
        {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal}></DeleteModal>}
        
      </ToDoContainer>
      </Container>
      }
      </AppContainer>
      
    </div>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;

const BlurContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  flex: 1;
  background: rgba(255, 255, 255, 0.34);
  backdrop-filter: blur(8px);
  z-index: 1;
  height: calc(100vh - ${modalHeight}px);
  width: 100%;
`;

const ToDoContainer = styled.div`
  margin-top: 2rem;
  padding: 0 1rem;
  background-color: ${Colors.BACKGROUND_COLOR_MAIN};
  border-radius: 16px 16px 0 0;
  flex: 1;
  position: relative;
  z-index: 0;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
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

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: ${modalHeight}px;
  background-color: ${Colors.MODAL_GREEN};
  z-index: 10;
  width: 100%;
  display: flex;
`;

const RemoveCompletedTasksButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${Colors.RED};
  color: ${Colors.WHITE};
  border: none;
  border-radius: 8px;
  width: 13rem;
  padding: 0 1rem;
  font-size: .8rem;
  white-space: nowrap;
  font-weight: 600;
  align-self: flex-end;
`;

export default App;
