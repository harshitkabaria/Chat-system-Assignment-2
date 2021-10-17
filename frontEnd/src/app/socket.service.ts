import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

//games namespace
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  public send(message: string): void {
    this.socket.emit('message', message);
    //console.log(message);
  }

  public onMessage(): Observable<any> {
    let observable = new Observable( observer =>{
      this.socket.on('message', (data:string) => observer.next(data));
    });
    return observable
  }

  public join(channelname:any, username:any) {
    debugger;
    this.socket.emit('join', {channelname, username})
  }

  public leave(channelname:any, username:any) {
    this.socket.emit('leave', {channelname, username})
  }
  
}