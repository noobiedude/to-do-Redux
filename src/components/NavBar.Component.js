import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../features/user/userSlice';
import { useEffect } from 'react';
import { setUser } from '../utils/localStorageManagment';
import styled from 'styled-components';
import * as Colors from '../res/colors';
import MenuIcon from '@material-ui/icons/Menu';

const mock_user = {
    username: `bob`,
    password: `123`,
    email: `bob@gmail.com`
};


const NavBar = ({ setShowAddToDoInput, setInputToDoText }) => {
    const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        setUser(user);
    }, [user])

    return(
        <Container>
        <HamburgerDiv><MenuIcon style={{ color: `${Colors.WHITE}`}}/></HamburgerDiv>
        <TitleDiv>Todoist</TitleDiv>
        {isSignedIn ? 
        <LogoutButton  onClick={(e) => {setInputToDoText(``); setShowAddToDoInput(false); dispatch(signOut())}}>Log Out</LogoutButton> 
        : 
        <LoginButton  backgroundColor={Colors.BLUE_PURPLE} color={Colors.BACKGROUND_COLOR_MAIN} onClick={(e) => dispatch(signIn(mock_user))}>Log In</LoginButton>}
        </Container>
        
    )
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${Colors.NAV_BAR_GREEN};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0 0 8px 8px;
`;


const TitleDiv = styled.div`
    font-size: 1.5rem;
    color: ${Colors.WHITE};
    font-weight: 600;
`;

const LoginButton = styled.button`
    white-space: nowrap;
    background-color: transparent;
    border: 2px solid ${Colors.WHITE};
    color: ${Colors.WHITE};
    font-size: 1rem;
    margin: 0 1rem;
    padding: .3rem .6rem;
    border-radius: 4px;
    font-weight: 600;
`;

const LogoutButton = styled.button`
    white-space: nowrap;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    margin: 0 1rem;
`;

const HamburgerDiv = styled.div`
    margin: 0 1rem;
`;
export default NavBar;