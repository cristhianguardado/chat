import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  saveMessage = environment.apiUrl + 'chat';

  httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};



  constructor(private http: HttpClient ) { }

  postMessage(form: Object) {
		return this.http.post(this.saveMessage, JSON.stringify(form), this.httpOptions)
	}

}
