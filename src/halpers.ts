import WebSocket from "ws";

export const sendMsg = (ws: WebSocket.WebSocket, msg: string) => {
	ws.send(msg + '\0');
}