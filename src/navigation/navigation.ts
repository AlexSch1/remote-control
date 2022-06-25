import robot from 'robotjs';
import { Commands } from '../enums';
import WebSocket from 'ws';
import {sendMsg} from "../halpers";

export const navigation = (cmd: string, ws: WebSocket.WebSocket) => {
  let [cmdType, pos] = cmd.split(' ');

  switch (cmdType) {
    case Commands.mouse_up:
      robot.moveMouse(
        robot.getMousePos().x,
        robot.getMousePos().y - Number(pos)
      );
      sendMsg(ws, cmdType);
      break;
    case Commands.mouse_down:
      robot.moveMouse(
        robot.getMousePos().x,
        robot.getMousePos().y + Number(pos)
      );
      sendMsg(ws, cmdType);
      break;
    case Commands.mouse_left:
      robot.moveMouse(
        robot.getMousePos().x - Number(pos),
        robot.getMousePos().y
      );
      sendMsg(ws, cmdType);
      break;
    case Commands.mouse_right:
      robot.moveMouse(
        robot.getMousePos().x + Number(pos),
        robot.getMousePos().y
      );
      sendMsg(ws, cmdType);
      break;
    case Commands.mouse_position:
      sendMsg(ws, `${Commands.mouse_position} ${robot.getMousePos().x} ${
          robot.getMousePos().y
      }`);
      break;
  }
};
