"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState<string>("")
  const [latestMsg, setLatestMsg] = useState<string[]>([])
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log('Connection established')
      newSocket.send("Hello Server")
    }

    newSocket.onmessage = (event) => {
      console.log(`Received: ${event.data}`)
      setLatestMsg([...latestMsg, event.data])
    }

    setSocket(newSocket)
  
    return () => {
      newSocket.close()
    }
  }, [])

  console.log('socket', socket)
  

  if(!socket) {
    return <>Loading...</>
  }

  return (
    <div className="m-4 flex flex-col justify-center items-center w-1/2">
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} className="border-2 border-black w-full"/>
      <button type="submit" onClick={() => socket.send(message)} className="bg-black w-1/2 text-white mt-4 p-2">Send</button>
      <h2 className="mt-4">Messages</h2>
      <div>
        {latestMsg}
      </div>
    </div>
  );
}
