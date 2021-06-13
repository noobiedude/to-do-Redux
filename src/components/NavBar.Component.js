import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../features/user/userSlice';
import { useEffect } from 'react';
import { setUser } from '../utils/localStorageManagment';
import styled from 'styled-components';
import * as Colors from '../res/colors';

const mock_user = {
    username: `bob`,
    password: `123`,
    email: `bob@gmail.com`
};


const NavBar = () => {
    const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        setUser(user);
    }, [user])

    return(
        <Container>
        {isSignedIn ? 
        <AuthButton backgroundColor={Colors.DARK_BLUE} color={Colors.BACKGROUND_COLOR_MAIN} onClick={(e) => dispatch(signOut())}>Sign Out</AuthButton> 
        : 
        <AuthButton border={Colors.DARK_BLUE} color={Colors.DARK_BLUE} onClick={(e) => dispatch(signIn(mock_user))}>Log In</AuthButton>}
        </Container>
        
    )
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${Colors.BACKGROUND_COLOR_MAIN};
`;

const AuthButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 3.5rem;
    margin-top: .5rem;
    background-color: ${props => props.backgroundColor || `transparent`};
    color: ${props => props.color || Colors.LIGHT_BLUE};
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    letter-spacing: 1px;
    border-color: ${props => props.border || `none`};
    border-width: ${props => props.border ? `3px` : `none`};
    font-weight: bold;
    white-space: nowrap;
`;
export default NavBar;