import { Avatar, Button, IconButton } from '@material-ui/core';
import { Chat, MoreVert, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as EmailValidator from "email-validator"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from "react-firebase-hooks/firestore";
import Chats from './Chats';

function Sidebar() {

    const [user] = useAuthState(auth);

    const userChatRef = db.collection("chats").where("users", "array-contains", user.email);

    const [chatsSnapshot] = useCollection(userChatRef);

    const [input, setInput] = useState("");
    
    const createChat = () => {
        
        // const addChat = prompt("Please enter an email address for the user you wish to chat with");
        
        if (!input) {
            return null;
        }
        if (EmailValidator.validate(input)
            && !chatAlreadyExists(input)
            && input !== user.email) {
            db.collection("chats").add({
                users: [user.email, input]
            })
        }
        
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) => chat.data().users.find(
                user => user === recipientEmail)?.length > 0
        );


    return (
        <Container>
            <Header>
                <UserAvatar title='Log out' onClick={() => auth.signOut()} src={user.photoURL} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <SearchContainer>
                <SearchContainerInput>
                    <SearchIcon />
                    <SearchInput
                        placeholder='Please enter an email address for the user you wish to chat with'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </SearchContainerInput>

            </SearchContainer>
            <SidebarButton onClick={createChat}>New Chat</SidebarButton>
            {chatsSnapshot?.docs.map((chat) => (
                <Chats key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid #222d34;
    height: 100vh;
    min-width: 50px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: #111b21;
    color: #aebac1;
`;

const Header = styled.div`
    display: flex;
    position: sticky; 
    top: 0;
    background-color: #fff;
    z-index: 1;
    justify-content: space-between; 
    align-items: center;
    padding: 15px;
    height: 80px;
    background-color: #202c33;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
   
`;

const ChatIcon = styled(Chat)`
    color: #aebac1;
`;

const MoreVertIcon = styled(MoreVert)`
    color: #aebac1;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #111b21;
    
`;

const SearchContainerInput = styled.div`
    border-radius: 10px;
    background-color: #202c33;
    width: 100%;
    align-items: center;
    
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
    padding: 10px;
    width: 90%;
    color: gray;
    background-color: transparent;
     
`;

const SidebarButton = styled(Button)`
    width: 100%;
    background-color: #111b21 !important;
    color: gray !important;
    &&&{
        border-top: 1px solid #222d34;
        border-bottom: 1px solid #222d34;
    }
    border-radius: 0 !important;
`;

const SearchIcon = styled(Search)`
    color: gray;
    /* margin-top: 10px; */
    position: relative;
    top: 5px;
    left: 5px;
`;