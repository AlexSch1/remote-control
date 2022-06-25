import WebSocket from 'ws';
import robot from 'robotjs';
import Jimp from 'jimp';
import {Commands} from "../enums";
import {sendMsg} from "../halpers";

export const prnt_scrn = async (_cmd: string, ws: WebSocket.WebSocket) => {
	try {
		const size = 200;
		const { x, y } = robot.getMousePos();
		const bitmap = robot.screen.capture(x, y, size, size);
		const j = new Jimp({
			data: bitmap.image,
			width: bitmap.width,
			height: bitmap.height
		});
		const imBase64 = await j.getBase64Async(Jimp.MIME_PNG);
		const base64 = imBase64.split(',')[1];


		sendMsg(ws, `${Commands.prnt_scrn} ${base64}`);
	} catch (e) {
		console.log(e)
	}
};
