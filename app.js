const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT | 4000;

const server = app.listen(PORT, () => console.log(`server on port ${PORT}`));

let socketsConnected = new Set();
const io = require("socket.io")(server);
io.on("connection", onConnected);

function onConnected(socket) {
  socketsConnected.add(socket.id);
  io.emit("clients-total", socketsConnected.size);
  socket.on("disconnect", () => {
    console.log(`socket disconnected ${socket.id}}`);
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
  });

  socket.on("message", (data) => {
    // console.log(data);
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("feedback", (data) => {
    socket.broadcast.emit("feedback", data);
  });
}

// making public folder into public folder
app.use(express.static(path.join(__dirname, "public")));
