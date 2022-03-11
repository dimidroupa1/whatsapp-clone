import { Button } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
// import logo from "../styles/logo.svg";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo 
                    src="https://freevectorlogo.net/wp-content/uploads/2013/04/whatsapp-vector-logo.png"
                />
                <SignIn variant="outlined" onClick={signIn}>Sign in with Google</SignIn>
            </LoginContainer>
        </Container>
    );
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: #0a1014;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background-color: #244242;
    border-radius: 5px;
    box-shadow: 0 4px 14px -3px rgba(255, 255, 255, .7);
    > button {
        color: #aebac1;
        background-color: #3b6868;
    }
`;

const Logo = styled.img`
    height: 250px;
    width: 250px;
    margin-bottom: 50px;
`;

const SignIn = styled(Button)`
    
`;