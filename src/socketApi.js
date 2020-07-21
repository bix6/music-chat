import io from "socket.io-client";
//const socket = io();
const socket = io("http://localhost:8003");

function receiveMessage() {
  console.log("receiveMessage() init");
  socket.on("chat message", (msg) => {
    console.log("receiveMessage: ", msg);
  });
}

function emitMessage(msg) {
  console.log("emitMessage() init");
  socket.emit("chat message", msg);
}

function closeSocket() {
  socket.close();
}

export { receiveMessage, emitMessage, closeSocket };
