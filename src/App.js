import styled from 'styled-components';
import './App.css';
import NavBar from './components/NavBar.Component';
import ToDoList  from './components/toDoList.Component';
import * as Colors from './res/colors';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Modal from './components/Modal.component';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteModal from './components/DeleteModal.component';
import Alert from './components/Alert.component';
import AddToDo from './components/AddToDo.component';

const modalHeight = 350;

function App() {
  const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
  const [showAddToDoInput, setShowAddToDoInput] = useState(false);
  const [inputToDoText, setInputToDoText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [idxModal, setIdxModal] = useState(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let numCompletedTodos = useSelector((state) => state.todo.completeToDos);
  const [showAlerts, setShowAlerts] = useState({delete: false, edit: false, deleteAll: false});
  const [justAttached, setJustAttached] = useState(false);
  
  useEffect(() => {
    setJustAttached(true);
    if (showAlerts.edit || showAlerts.delete || showAlerts.deleteAll) {
      setTimeout(() => {
        setJustAttached(false);
        setTimeout(() => {
          setShowAlerts({delete: false, edit: false, deleteAll: false});
        }, 1000);
      }, 3000);
    }
  }, [showAlerts])
  return (
    <div className="App">
      <AppContainer>
       {showModal ? 
       //background
       <Container> <BlurContainer />
      <NavBar setShowAddToDoInput={setShowAddToDoInput} setInputToDoText={setInputToDoText}></NavBar>
      <ToDoContainer>
        {/* {isSignedIn && !showAddToDoInput && } */}
        <AddToDo inputToDoText={inputToDoText} setInputToDoText={setInputToDoText} showAddToDoInput={showAddToDoInput} setShowAddToDoInput={setShowAddToDoInput} />
         <ModalContainer className={`modal-container`}>
           <Modal idxModal={idxModal} setShowModal={setShowModal} setIdxModal={setIdxModal} setShowAlerts={setShowAlerts} showAlerts={showAlerts} setJustAttached={setJustAttached}></Modal>
          </ModalContainer>
     
        <ToDoList setShowModal={setShowModal} setIdxModal={setIdxModal}></ToDoList>
        
        
      </ToDoContainer>
      </Container>
      :
      <Container>
      <NavBar setShowAddToDoInput={setShowAddToDoInput} setInputToDoText={setInputToDoText}></NavBar>
      <ToDoContainer>
        {/* {isSignedIn && !showAddToDoInput && } */}
        <AddToDo inputToDoText={inputToDoText} setInputToDoText={setInputToDoText} showAddToDoInput={showAddToDoInput} setShowAddToDoInput={setShowAddToDoInput} />
        <ToDoList setShowModal={setShowModal} setIdxModal={setIdxModal}></ToDoList>
        {isSignedIn && numCompletedTodos !== 0 && <RemoveCompletedTasksButton onClick={(e) => {setShowDeleteModal(true)}}> <DeleteIcon style={{marginRight: `.2rem`}}/>Remove completed tasks</RemoveCompletedTasksButton>}
        {showDeleteModal  && <DeleteModal setShowDeleteModal={setShowDeleteModal} showAlerts={showAlerts} setShowAlerts={setShowAlerts}></DeleteModal>}
        
      {showAlerts.edit && <Alert justAttached={justAttached} type={`edit`}></Alert>}
      {showAlerts.delete && <Alert justAttached={justAttached} type={`delete`}></Alert>}
      {showAlerts.deleteAll && <Alert justAttached={justAttached} type={`deleteAll`}></Alert>}
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
  @media(min-width: 900px) {
  margin: 0 4rem; 
} 
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
  margin-top: 1.5rem;
  padding: 0 1rem;
  background-color: ${Colors.BACKGROUND_COLOR_MAIN};
  border-radius: 16px 16px 0 0;
  flex: 1;
  position: relative;
  z-index: 0;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  border-top: 6px solid ${Colors.NAV_BAR_GREEN};
  overflow-x: hidden;
  /* transform: translateX(0); //for position fixed to work in alert component   */
`;



const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  @media(min-width: 900px) {
  left: 4rem;
  bottom: 0;
  right: 4rem;
  
} 
  height: ${modalHeight}px;
  background-color: ${Colors.MODAL_GREEN};
  z-index: 10;
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
  &:hover{
    cursor: pointer;
  }
`;

export default App;
