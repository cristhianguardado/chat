import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { Message } from '@app/shared/interfaces';


interface AuthResponse {
  id: string;
  message: Message;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private message$ = new BehaviorSubject<Message | null>(null);

  constructor(private http: HttpClient) {}


  register(
    fullname: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<Message> {
    return this.http
      .post<AuthResponse>('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword,
      })
      .pipe(
        tap(({ id, message }) => {
          this.setMessage(message);
        }),
        pluck('message')
      );
  }

  setMessage(message: Message | null): void {
    if (message) {
      message.isAdmin = message.roles.includes('admin');
    }

    this.message$.next(message);
    window.message = message;
  }

  getMessage(): Observable<Message | null> {
    return this.message$.asObservable();
  }


}
