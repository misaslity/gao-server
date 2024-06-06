const express = require("express");
const { hidePoweredBy } = require("helmet");
const { port } = require("./config.js");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const router = require("./route/route.js");
const connection = require("./database/index.js");
const moment= require("moment")
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(hidePoweredBy());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(router);

app.get("*", (req, _, next) => {
  console.log(`GET ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.status(423).render("index");
});

app.get("/server", (req, res) => {
  res.redirect("https://discord.gg/uV6HsqxBBC");
});

app.get("/serverUrl", (req, res) => {
  res.redirect("https://discord.gg/uV6HsqxBBC");
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      '<h1>ERROR 404</h1>Podana strona nie istnieje.<br><br><a href="/">Strona główna</a>'
    );
  console.log(`Cannot GET: ${req.originalUrl} [404]`);
});

app.use((err, req, res, next) => {
  res.status(500).send("<h1>ERROR 500</h1>");
  console.log(`Cannot GET: ${req.originalUrl} [500]\n${err}`);

  return next;
});

let countdown = 180;
let intervalId = null;

const sendCountdown = async (io) => {
  io.emit("resultNumbers", countdown);
  countdown--;

  if (countdown < 0) {
    const result = await generateRandomNumbers();
    const resultNext = await generateRandomNumbers();
    const numbers = await generateRandomNumbersSession();
    const numbersNext = await generateRandomNumbersSession();
    const [rows1]= await connection.query("SELECT * FROM session ORDER BY id DESC LIMIT 5")
    const timeCreated= new Date().toString()
    const timeCreated3m= moment().add(3, 'minutes').toString()
    const timeInt= moment(new Date()).valueOf()
    const timeInt3m= moment().add(3, 'minutes').valueOf();
    await connection.query("INSERT INTO session(result, number, session_id, time_created, timeInt) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE number= VALUES(number)", [
      result,
      numbers,
      parseInt(rows1[0].session_id),
      timeCreated,
      timeInt
    ]);
    await connection.query("INSERT INTO session(result, number, session_id, time_created, timeInt) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE number= VALUES(number)", [
      resultNext,
      numbersNext,
      parseInt(rows1[0].session_id) + parseInt(1),
      timeCreated3m,
      timeInt3m
    ]);
    const [currentResultSession]= await connection.query("SELECT result FROM session WHERE session_id= ?", [rows1[0].id])
    // const [currentResultSessionNext]= await connection.query("SELECT result FROM session WHERE session_id= ?", [rows[0].id])

    io.emit("result", {result: rows1[0]?.result, number: rows1[0].number, session_id: rows1[0].session_id, id: rows1[0].session_id, x: currentResultSession[0]});
    io.emit("last5session", {data: rows1})
    countdown = 179;
  }
};

async function generateRandomNumbers() {
  const [rows] = await connection.query("SELECT * FROM reserve");
  if (rows[0]?.result) {
    await connection.query("DELETE FROM reserve");
    return rows[0]?.result?.trim()?.toString().padStart(5, "0");
  } else {
    const randomNumber = Math.floor(Math.random() * 100000);
    const formattedRandomNumber = randomNumber.toString().padStart(5, "0");
    return formattedRandomNumber;
  }
}

async function generateRandomNumbersSession() {
  const randomNumber = Math.floor(Math.random() * 100000000);
  const formattedRandomNumber = randomNumber.toString().padStart(8, "0");
  return formattedRandomNumber;
}

io.on("connection", (socket) => {
  console.log("Client connected");

  // Gửi giá trị countdown hiện tại về cho client khi client kết nối lại
  socket.emit("resultNumbers", countdown);

  // Nếu chưa có interval chạy, bắt đầu đếm ngược
  if (!intervalId) {
    intervalId = setInterval(() => {
      sendCountdown(io);
    }, 1000);
  }

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, null, null, () =>
  console.log(`server run on port http://127.0.0.1:${port}`)
);
