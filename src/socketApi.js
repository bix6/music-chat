import io from "socket.io-client";
//const socket = io();
const socket = io("http://localhost:8003");

function receiveMessage() {
  console.log("receiveMessage init");
  socket.on("chat message", (msg) => {
    console.log("receiveMessage: ", msg);
  });
}

function sendMessage(msg) {
  console.log("sendMessage() init");
  socket.emit("chat message", msg);
}

// TODO unmount socket

export { receiveMessage, sendMessage };
