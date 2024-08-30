import React from 'react'

import { Box,styled } from '@mui/material'
import { useContext,useState,useEffect,useRef } from 'react';

import {AccountContext} from '../../../context/AccountProvider.jsx'
import { newMessages,getMessages } from '../../../service/api.js';

//component
import Footer from './Footer';
import Message from './Message';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 80vh;
    // overflow-y kaa matlab hai ki, jab content badha jayae toh hamae scroll kaa fiture mil jayae
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;

const Messages = ({person,conversation}) => {

  const {account,socket,setNewMessageFlag,newMessageFlag}=useContext(AccountContext)
  const [value,setValue]=useState('');
  const [messages,setMessages]=useState([])
  
  const [file,setFile]=useState()
  const [Image,setImage]=useState('')

  const [incomingMessage, setIncomingMessage] = useState(null);//esmae single messge store hoga

  const scrollRef=useRef();


  useEffect(() => {
    socket.current.on('getMessage', data => {
      
        setIncomingMessage({
            ...data,
            createdAt: Date.now()
        })
    })
  }, []);

  useEffect(() => {
    
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
        setMessages((prev) => [...prev, incomingMessage]);
    
  }, [incomingMessage, conversation]);


  useEffect(()=>{
    const getMessageDetails=async ()=>{
      let data=await getMessages(conversation._id);
      // console.log(data)
      setMessages(data)
    }
    conversation._id && getMessageDetails();

  },[person._id,conversation._id,newMessageFlag])


  useEffect(()=>{
    
    scrollRef.current?.scrollIntoView({transition:'smooth'})
  },[messages])

  

  const sendText=async (e)=>{

    // console.log(e)
    const code=e.keycode || e.which;
    //13 for enter
    if(code===13)
    {
      let message={}
      if(!file){
        message={
          senderId:account.sub,
          receiverId:person.sub,
          conversationId:conversation._id,
          
          type:'text',
          text:value
        }
      }
      else
      {
        message={
          senderId:account.sub,
          receiverId:person.sub,
          conversationId:conversation._id,
          
          type:'file',
          text:Image
        }
      }
      
      // console.log(message)

      socket.current.emit('sendMessage',message)

      await newMessages(message)//save to DB
      setValue('')
      setFile('')
      setImage('')
      setNewMessageFlag(prev => !prev) 

    }
    
  }

  return (
    
    <Wrapper>
        <Component>
          {
            messages && messages.map(message =>(
              
              <Container ref={scrollRef}>
                <Message message={message}/>
              </Container>
              
            ))
          }
        </Component>
        <Footer 
        
          sendText={sendText}
          setValue={setValue}
          value={value}
          file={file}
          setFile={setFile}
          setImage={setImage}
         />
    </Wrapper>
  )
}

export default Messages