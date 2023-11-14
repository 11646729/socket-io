import React, { useState } from "react"
import ClientComponent from "./ClientComponent"

const App = () => {
  const [loadClient, setLoadClient] = useState(false)

  return (
    <>
      {/* LOAD OR UNLOAD THE CLIENT */}
      {loadClient ? (
        //  if true
        <button onClick={() => setLoadClient((prevState) => !prevState)}>
          STOP CLIENT
        </button>
      ) : (
        // if false
        <button onClick={() => setLoadClient((prevState) => !prevState)}>
          START CLIENT
        </button>
      )}

      {/* SOCKET IO CLIENT*/}
      {loadClient ? <ClientComponent /> : null}
    </>
  )
}

export default App
