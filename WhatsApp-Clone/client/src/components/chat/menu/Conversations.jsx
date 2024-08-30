//jab kafi jyada account kae user show honae lagae toh usae handle karnae kae liyae

import React, { useState,useContext } from 'react'
import { useEffect } from 'react';

import { Box ,styled,Divider} from '@mui/material';

//api
import { getUsers } from '../../../service/api';
//component
import Conversation from './Conversation.jsx';
import { AccountContext } from '../../../context/AccountProvider';


const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({text}) => {

    const [users,setUsers] = useState([])
    const { account ,setActiveUsers,socket} = useContext(AccountContext); 
    

    
    useEffect(() => {
        const fetchData = async () => {
            let response=await getUsers();
            const filteredData=response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData)
            console.log("useEffect inside conversations")
            console.log(response)

        }
        fetchData();
    }, [text]);

    
    useEffect(()=>{
        
        socket.current.emit('addUsers',account)
        socket.current.on("getUsers",users=>{
            setActiveUsers(users)
        })

    },[account])

  return (
    <Component>
        {
            users.map((user)=>{
                
                return (user.sub !==account.sub &&
                ( 
                <>
                    
                    <Conversation user={user} />
                    <StyledDivider />
                </>
                ))
            })
        }
    </Component>
  )
}

export default Conversations

/*
users.map(function d(user,idx){
                console.log("Hi"+idx)
            })
*/