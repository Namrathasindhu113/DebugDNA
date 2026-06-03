import SockJS from "sockjs-client"
import { Client } from "@stomp/stompjs"

export const connectWebSocket = (onMessage) => {

  const socket = new SockJS(
    "http://localhost:9090/ws"
  )

  const client = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    onConnect: () => {

      console.log(
        "WebSocket Connected"
      )

      client.subscribe(
        "/topic/issues",
        (message) => {

          const issue =
            JSON.parse(message.body)

          onMessage(issue)
        }
      )
    },

    onStompError: (frame) => {

      console.error(
        "WebSocket Error",
        frame
      )
    },
  })

  client.activate()

  return client
}