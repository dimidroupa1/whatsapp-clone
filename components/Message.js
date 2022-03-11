import moment from 'moment';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import { auth } from '../firebase';

function Message({ user, message }) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
                </Timestamp>
            </TypeOfMessage>
        </Container>
    );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
    max-width: 700px;
    overflow-wrap: break-word;
    @media(max-width: 1200px){
        max-width: 200px;
    }
`;

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #005c4b;
    color: #aebac1;
`;

const Reciever = styled(MessageElement)`
    background-color: #202c33;
    text-align: left;
    color: #aebac1;
`;

const Timestamp = styled.span`
    color: #80aea5;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;