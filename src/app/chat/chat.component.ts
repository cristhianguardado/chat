import { Component, OnInit } from '@angular/core';
import { string } from 'joi';
import * as io from 'socket.io-client'

const SOCKET_ENDPOINT = 'localhost:4040';
function generaNss() {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < charactersLength; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

var userNameRandom = generaNss();

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	private socket: any;
	message: string = '';
	userName = userNameRandom;

	constructor() {
	}

	ngOnInit(): void {
		this.setupSocketConnection();
	}

	setupSocketConnection() {
		this.socket = io(SOCKET_ENDPOINT);
		this.socket.on('message-broadcast', (data: string) => {
		console.log("message received " + data)
		if (data) {
				const element = document.createElement('li');
				element.innerHTML = data;
				element.style.background = 'white';
				element.style.padding =  '15px 30px';
				element.style.margin = '10px';
				//document.getElementById('message-list').appendChild(element);
			}
	 });
 }

	SendMessage() {
		console.log("Send message " + this.message)
		this.socket.emit('message', this.userName, this.message);
		const element = document.createElement('li');
		element.innerHTML = this.message;
		element.style.background = 'white';
		element.style.padding =  '15px 30px';
		element.style.margin = '10px';
		element.style.textAlign = 'right';
		//document.getElementById('message-list').appendChild(element);
		this.message = '';
	}

}
