import http from "http";
import express from "express";
import SocketIO from "socket.io";
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";

const app = express();

const liveServer = livereload.createServer({
  exts: ["js", "pug", "css"],
  delay: 1000,
});

liveServer.watch(__dirname);

app.use(livereloadMiddleware());

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.get("/", (req, res) => res.render("home"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wsServer = SocketIO(server);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event:${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) => {
        socket.to(room).emit("bye");
      });
    });
    socket.on("new_message", (msg, room, done) => {
      socket.to(room).emit("new_message", msg);
      done();
    });
  });
});

// const wss = new WebSocket.Server({ server });
// const sockets = [];
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon";
//   console.log("Connected to Browser");
//   socket.on("close", () => console.log("DisConnected from the Browser"));
//   socket.on("message", (message) => {
//     const parsed = JSON.parse(message.toString("utf-8"));
//     switch (parsed.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname} : ${parsed.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//         break;
//       default:
//         break;
//     }
//   });
// });

server.listen(3000, handleListen);
