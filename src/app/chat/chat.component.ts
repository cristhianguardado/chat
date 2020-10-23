import { Component, OnInit } from '@angular/core';
import { string } from 'joi';
import * as io from 'socket.io-client'

const SOCKET_ENDPOINT = 'localhost:4040';
function generaNss() {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < charactersLength; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

let userNameRandom = generaNss();

const htmlList = document.getElementById("message-list")!

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	private socket: any;
	message: string = '';
  userName = userNameRandom;
  chatMessages = [{
    userName: '',
    message: ''
  }];

	constructor() {
	}

	ngOnInit(): void {
		this.setupSocketConnection();
	}

	setupSocketConnection() {
		this.socket = io(SOCKET_ENDPOINT);
		this.socket.on('message-broadcast', (data: string) => {
    console.log("message received ")
    console.log(data)
		if (data) {
      var chatOutput = {
        userName: data.userName,
        message: data.message
      }
      this.chatMessages.push(chatOutput)
		}
	 });
 }

	SendMessage() {
    var chatInput = {
      userName: this.userName,
      message: this.message
    }
    this.chatMessages.push(chatInput)
		this.socket.emit('message', chatInput);
		this.message = '';
	}

}
