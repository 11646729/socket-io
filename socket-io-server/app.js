import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import index from "./routes/index.js"

//
//Code taken from: https://www.valentinog.com/blog/socket-react/
//

const port = process.env.PORT || 4001

const app = express()
app.use(index)

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })

let interval

io.on("connection", (socket) => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000)

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(interval)
  })
})

const getApiAndEmit = (socket) => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response)
}

httpServer.listen(port, () => console.log(`Listening on port ${port}`))
