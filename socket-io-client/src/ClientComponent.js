import React, { useEffect, useState, memo } from "react"
import socketIOClient from "socket.io-client"

const EXPRESS_SERVER_ENDPOINT = "http://127.0.0.1:4001"

const ClientComponent = () => {
  const [response, setResponse] = useState("")

  useEffect(() => {
    const socket = socketIOClient(EXPRESS_SERVER_ENDPOINT, {
      autoConnect: false,
    })

    // Manual connect
    socket.connect()

    socket.on("FromAPI", (data) => {
      // console.log(socket.id)
      setResponse(data)
    })

    // CLEAN UP THE EFFECT
    return () => socket.disconnect()
    //
  }, [])

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  )
}

export default memo(ClientComponent)
