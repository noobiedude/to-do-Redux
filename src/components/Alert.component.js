import styled, { keyframes } from "styled-components";
import * as Colors from '../res/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Alert = ({ justAttached, type }) => {

  const getAlertText = (type) => {
      switch(type){
            case `edit`:
                return `Idea edited!`;
            case `delete`:
                return `Idea deleted!`;
            case `deleteAll`:
                return `Completed plan deleted!`;
            default:
                break;
        
      }
  }
  return (
    <AlertContainer justAttached={justAttached}>
        <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
        <AlertText>{getAlertText(type)}</AlertText>
    </AlertContainer>
  );
};

const AlertText = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: ${Colors.WHITE};
    margin-left: .5rem;
`;
const slideIn = keyframes`
  0%{
    transform: translateX(200px) scale(0.5);

  }
  100%{
    transform: translateX(0) scale(1);
  }
  
`;

const slideOut = keyframes`
  0%{
    transform: translateX(0) scale(1);
  }
  100%{
    transform: translateX(200px) scale(0.5);
  }
  
`;

const AlertContainer = styled.div`
  position: fixed;
  right: 1rem;
  @media(min-width: 900px) {
    right: 5rem;
  } 
  bottom: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1.5rem;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 1rem;
  color: white;
  animation: ${slideIn} 1s ease;
  animation: 1s ${(props) => (props.justAttached ? slideIn : slideOut)} ease;
  background-color: ${Colors.NAV_BAR_GREEN};
`;

export default Alert;
