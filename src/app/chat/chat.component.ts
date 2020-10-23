import { Component, OnInit } from '@angular/core';
import { string } from 'joi';
import * as io from 'socket.io-client'
import { ChatService } from '../shared/services/chat/chat.service'

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
  chatMessages = [{}];
  activeUsers: string = '0';


	constructor(
    private chatService: ChatService
  ) {	}

	ngOnInit(): void {
		this.setupSocketConnection();
	}

	setupSocketConnection() {
		this.socket = io(SOCKET_ENDPOINT);
		this.socket.on('message-broadcast', (data: string) => {
		if (data) {
      console.log("message received ")
      console.log(data)
      this.chatMessages.push(data)
		}
   });
  this.socket.on('active-users', (data: string) => {
    console.log(data)
    this.activeUsers = data
  });
}

	SendMessage() {
    var chatInput = {
      userName: this.userName,
      message: this.message,
      position: "right"
    }

    var sendMessage = {
      userName: this.userName,
      message: this.message,
    }

    this.chatMessages.push(chatInput)
    this.socket.emit('message', sendMessage);

    this.chatService.postMessage(chatInput).subscribe((res) => {
      if (res) {
        console.log(res)
      }
    });

		this.message = '';
	}

}
