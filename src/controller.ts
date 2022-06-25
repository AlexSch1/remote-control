import { Commands, CommandType } from './enums';
import { navigation } from './navigation/navigation';
import WebSocket from 'ws';
import { drawing } from './drawing/drawing';
import {prnt_scrn} from "./prnt-scrn/prnt-scrn";

export const controller = async (cmd: Commands, ws: WebSocket.WebSocket) => {
  const [cmdType] = cmd.split('_');

  switch (cmdType) {
    case CommandType.Mouse:
      navigation(cmd, ws);
      break;
    case CommandType.Draw:
      drawing(cmd, ws);
      break;
    case CommandType.Prnt:
    await  prnt_scrn(cmd, ws);
      break;
  }
};
