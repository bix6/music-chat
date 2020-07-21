import io from "socket.io-client";
const socket = io("http://localhost:8003");

// TODO trying to use this to open and close
// the socket when the user navigates back
// right now it logs + 1 times
// for every back button
function openSocket() {
  socket.open();
}

function closeSocket() {
  socket.close();
}

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

export { openSocket, closeSocket, receiveMessage, emitMessage };
