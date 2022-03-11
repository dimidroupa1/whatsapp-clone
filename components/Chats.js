import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chats({ id, users}) {

    const router = useRouter();

    const [user] = useAuthState(auth);

    const [recipientsSnapshot] = useCollection(db.collection("users").
    where("email", "==", getRecipientEmail(users, user)));

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientsSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user)

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ): (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            
            <p>{recipientEmail}</p>
        </Container>
    );
}

export default Chats;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;
    :hover{
        background-color: #202c33;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;
