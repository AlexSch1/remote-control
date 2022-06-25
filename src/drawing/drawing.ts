import robot from 'robotjs';
import { Commands } from '../enums';
import WebSocket from 'ws';
import {sendMsg} from "../halpers";

const draw_circle = (cmd: any) => {
  let [_cmdType, radius] = cmd.split(' ');

  const mousePos = robot.getMousePos();
  robot.mouseClick();

  for (let i = 0; i <= Math.PI * 2; i += 0.05) {
    const x = mousePos.x + (radius * Math.cos(i));
    const y = mousePos.y + (radius * Math.sin(i));
    robot.mouseToggle('down');

    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');

};

const draw_side = (length: number, pos: 0 | 1, direction: number = 1) => {
  const mousePos = robot.getMousePos();
  robot.mouseToggle('down');

  for (let i = 0; i <= length; i += 2) {
    const x = pos ? mousePos.x : mousePos.x + (i * direction);
    const y = pos ? mousePos.y + (i * direction) : mousePos.y;

    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
}

const draw_rectangle = (cmd: any) => {
  let [_cmdType, radius, length] = cmd.split(' ');
  robot.mouseClick();

  draw_side(length, 1);
  draw_side(radius, 0);
  draw_side(length, 1, -1);
  draw_side(radius, 0, -1);
};

const draw_square = (cmd: any) => {
  let [_cmdType, length] = cmd.split(' ');
  robot.mouseClick();

  draw_side(length, 1);
  draw_side(length, 0);
  draw_side(length, 1, -1);
  draw_side(length, 0, -1);
};

export const drawing = (cmd: string, ws: WebSocket.WebSocket) => {
  let [cmdType] = cmd.split(' ');

  switch (cmdType) {
    case Commands.draw_circle:
	    draw_circle(cmd);
      break;
    case Commands.draw_rectangle:
      draw_rectangle(cmd);
      break;
    case Commands.draw_square:
      draw_square(cmd);
      break;
  }

  sendMsg(ws, cmd);
};
