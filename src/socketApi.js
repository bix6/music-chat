import io from "socket.io-client";
// TODO
// This has to be the base url, why?
// Using "localhost:8003/api" fails
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
  console.log("receiveMessage() running");
  socket.on("chat message", (msg) => {
    console.log("receiveMessage: ", msg);
  });
}

function emitMessage(msg) {
  console.log("emitMessage() running");
  socket.emit("chat message", msg);
}

function receiveMessage2(cb) {
  console.log("receiveMessage2() running");
  socket.on("chat message", (msg) => cb(null, msg));
}

export {
  openSocket,
  closeSocket,
  receiveMessage,
  emitMessage,
  receiveMessage2,
};
