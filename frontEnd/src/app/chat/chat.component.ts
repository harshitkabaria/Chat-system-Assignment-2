import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { io } from 'socket.io-client';

import { SocketService   } from '../socket.service';
const serverURL = "http://localhost:3000/";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 

  constructor(private router: Router, private httpClient: HttpClient,private socketService: SocketService) { }
  messagecontent:string | null = ''
  messages:any[] = [];
  ioConnection: any;
  channel:any;
  channels: any[] = [];
  currentUser:any;
  
  //the current channel
  channelName:string = 'Welcome';
  //the value from the channel selection
  selectedChannel:string = ''

  currentUsername:string | null = '';
  currentRole:string | null = '';
  ngOnInit(): void {
    this.fetchGroup();
    this.getChannels();
    debugger;
    this.currentUser = localStorage.getItem('user');
    this.currentUsername = JSON.parse(this.currentUser).username;
  }
  public fetchGroup(){     
    this.initToConnection();
    this.httpClient.get(serverURL+'api/groups').subscribe(data => {
      
      // this.groups = data;
    
      //let jLoggedinUser = JSON.parse(this.loggedInUser);
      // console.log("chAT",this.groups);
     // console.log(this.regGroupObj);
    }, error => {

    });


  

    }
    private initToConnection(){
      this.currentUsername = sessionStorage.getItem("username")
      this.socketService.initSocket();
  
      //set obervable to watch for messages.
      this.ioConnection = this.socketService.onMessage()
        .subscribe((message:string) => {
          //Add message to array
          console.log(message)
          this.messages.push(message);
        });
    }
  
  
    public chat(){
      if(this.messagecontent){
  
        //check message
        //console.log(this.messagecontent);
        let currentTime = new Date()
        this.socketService.send(this.messagecontent);
        // this.chatService.addChat(this.channelName, this.currentUsername as string, this.messagecontent, currentTime)
        //   .subscribe((data:any)=> {
        this.messagecontent = null;
        //     //this.messages = data;
        //   })
        
      } else {
        console.log("No message.")
      }
  
    }
  
    getChats() {
      //call join channel function
      this.leave()
      this.messages = []
      this.join()
      // this.chatService.getChats(this.channelName).subscribe((data: any) => {
      //   this.messages = data;
      // });
      this.selectedChannel = this.channelName
      
    }
  
    join() {
      this.socketService.join(this.channelName, this.currentUsername);
    }
  
    leave() {
      this.socketService.leave(this.channelName, this.currentUsername);
      //this.selectedChannel = "";
      //this.messages = [];
      
    }
  
    //Get all group data

    //Get all channels.
    getChannels() {
      this.httpClient.get(serverURL+'api/channels').subscribe(data => {
        this.channel = data;

      }, error => {  
      });
      //console.log(this.channels)
    }
  
    // selectChannel(){
  
    //   this.leave()
    //   this.channelName = this.selectedChannel
      
    //   this.getChats(this.channelName);
    //   this.join()
    // }
}
