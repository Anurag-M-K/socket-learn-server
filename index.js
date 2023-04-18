const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "https://joyful-moonbeam-f2f07c.netlify.app",
    methods: ["GET", "POST"],
  },
});


 
//INIITIATE SOCKET CONNECTION BASED ON EVENTS ,io.on - listening
io.on("connection",(socket)=>{
    console.log("user connected ",socket.id);

    socket.on("join_room",(data)=>{ //recieving data from frontend by events
      socket.join(data)
      console.log('user with id : ',socket.id +  "joined room : ",data)
    })


    socket.on("send_message",(data)=>{ 
      socket.to(data.room).emit("recieve_message",data) //sending message to the room which we included
    })
    socket.on("disconnect",()=>{
      console.log('user diconnected', socket.id)
    })
})



server.listen(8080,()=>{
  console.log('server running at 5000')
})