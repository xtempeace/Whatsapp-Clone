//socket.io kaa server banaane walae hai
import {Server} from "socket.io"

const io=new Server(9000,{
    cors:{
        origin:'http://localhost:3000',
    },
})

//array of active users
let users=[];

const addUser=(userData,socketId)=>{

    if(!userData)
    {
        
    }
    else
    {
        
        !users.some(user=> user.sub === userData.sub) && users.push({...userData,socketId})
        console.log("Array:" + users)
    }
    
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}


io.on('connection', (socket)=>{
    console.log("User Connected")
    
    socket.on("addUsers",userData=>{
        
        addUser(userData,socket.id)
        
        io.emit("getUsers",users)
    })


    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        if(!user){

        }
        else
        {
            io.to(user.socketId).emit('getMessage', data) 
        }
        
    })


})