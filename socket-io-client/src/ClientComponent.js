import React, { useEffect, useState, memo } from "react"
import socketIOClient from "socket.io-client"
import * as myConstClass from "./constants.js"

const ClientComponent = () => {
  const [response, setResponse] = useState("")

  useEffect(() => {
    const socket = socketIOClient(myConstClass.EXPRESS_SERVER_ENDPOINT, {
      autoConnect: false,
    })

    // Manual connect
    socket.connect()

    socket.on("FromAPI", (data) => {
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
