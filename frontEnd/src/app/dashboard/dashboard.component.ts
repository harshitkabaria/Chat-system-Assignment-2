import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';import {Router} from '@angular/router';
import Users from '../models/users';
import { HttpClient } from '@angular/common/http';
//import remove from 'lodash/remove';
import Group from '../models/groups';
import { ToastrService } from 'ngx-toastr';
const serverURL = "http://localhost:3000/";
let userdata:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private toastr: ToastrService) { }
  a:any;
  user:any;

  groups:any = [];

  myGroups:any;

  users :any;

  channels :any =[];

  channelUser:any = [];

  isthisSuperAdmin: boolean = false ;

  addusertothischannel:any = [];

  createGroupModal = {
    name: '',
  };

  createChannelModal = {
    name: '',
    groupId: null,
  };

  inviteUserToChannelModel = {
    name: '',
    email: '',
    group: null,
    channel: null,
    channels: [],
  } || [] ;

  addUserToChannelModal = {
    channelId: null,
    users: [],
    addToChannelGroupUsers:[],
    channelList: [],
  } ;

  removeUserToChannelModal = {
    channelId: null,
    users: null,
    removeToChannelGroupUsers: [],
    channelList: [],
  } || [];

  ngOnInit(): void {

    this.user = localStorage.getItem('user');
    this.getAllUsers();
    this.getAllGroups();
    this.getAllChannels();
    this.isSuperAdmin();
  
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  isSuperAdmin() {
    
    if( userdata.role == 4){
      
      this.isthisSuperAdmin = true;
    }
    else{
      this.isthisSuperAdmin = false;
    }
  }

  isGroupAdmin() {
    return userdata.role && userdata.role > 2;
  }

  isGroupAssis() {
    return userdata.role && userdata.role > 1;
  }

  isNormalUser(user:any) {
    
    return user.role === 1;
  }

  getAllGroups() {
    
    this.httpClient.get(serverURL+'api/groups').subscribe(data => {
       ;
      this.groups = data;
    }, error => {

    });
  }

  getAllUsers() {
    
    
    this.httpClient.get(serverURL+'api/getAllUsers').subscribe(data => {this.users = data
      this.a=this.users.userData;
      console.log("all users",this.users.userData);
    }, error => {

    });
  }

  getAllChannels() {
    this.httpClient.get(serverURL+'api/channels').subscribe(data => {
       ;
      this.channels = data;
      console.log("channeldata",data)
    }, error => {

    });
  }

 
  selectgroupid(group:any){

    this.addusertothischannel = this.channels.filter((item: { groupId: any; }) => item.groupId === group._id)

  }
  onGroupSelectChange(type:any, group:any) {
    if (type === 'createChannel') {
      this.createChannelModal.groupId = group._id;
    } else if (type === 'addUserToChannel') {
      this.addUserToChannelModal.channelList = this.channels.filter((item: { groupId: any; }) => item.groupId === group._id);
      
    } else if (type === 'removeUserFromChannel') {
      this.removeUserToChannelModal.channelList = this.channels.filter((item: { group: any; }) => item.group === group.id);
      
      
    } else if (type === 'inviteUserToChannel') {
       ;
      this.inviteUserToChannelModel.channels = this.channels.filter((item: { group: any; }) => item.group === group.id);
    }
  }
  getchanneluserId(channel:any){
    for(let i=0;i<=channel.users.length;i++){
      debugger
      for(let j=0;j<this.users.length;j++){
        
        if(channel.users[i] == this.users[j]._id){
          debugger;
          this.channelUser.push(this.users[j]);
         
        }
      }
     
    }
    console.log("getchanneluserId",this.channelUser);
  }
  onChannelSelectChange(type:any, channel:any) {
    if (type === 'removeUserFromChannel') {
       debugger
      this.removeUserToChannelModal.removeToChannelGroupUsers = channel.users.filter((item: {channel:any}) => channel.users.userId ==  this.users._id);
      this.removeUserToChannelModal.users = this.users.filter();
      
      this.removeUserToChannelModal.channelId = channel.id;
    }  else if (type === 'inviteUserToChannel') {
       ;
      this.inviteUserToChannelModel.channel = channel;
    } else {
      this.addUserToChannelModal.channelId = channel.id;
    }
  }

  onUserSelectChange(type: string, user: any) {
    console.log(type);
    console.log(user);
    if (type === 'addUserToChannel') {
      this.addUserToChannelModal.users = user._id;
    }
    if (type === 'removeUserFromChannel') {
      this.removeUserToChannelModal.users = user._id;
    }
  }

  createGroup() {
    
    if (this.createGroupModal.name) {
      this.httpClient.post(serverURL+'api/addGroup', {
        name: this.createGroupModal.name,
    }).subscribe(data => {
      console.log(data)
        this.groups.push(data);
        this.createGroupModal.name = '';
        this.toastr.success(`Group has been Created`, '');
      }, error => {

      });
    }
  }

  removeGroup(group:any) {     
    this.httpClient.post(serverURL+`api/deletegroup`,{
      groupId : group._id
    }).subscribe(data => {
      this.groups = data
      this.toastr.success(`Group has been removed`, '');
    }, error => {

    });
  }

  addUserToChannel() {
      if (this.addusertothischannel && this.addUserToChannelModal.users) {
      console.log(this.addUserToChannelModal);
     // this.channels[this.addUserToChannelModal.channelId - 1].users.push(this.addUserToChannelModal.userId);
      this.httpClient.post(serverURL+`api/addUserTochannel`, {
        channelId: this.addusertothischannel[0]._id,
        userId: this.addUserToChannelModal.users,
      }).subscribe(data => {
        debugger;
       // this.addusertothischannel = '';
        this.channels = data;
        this.toastr.success(`User has been added`, 'Add User To Channel Success');
      }, error => {

      });
    }
  }

  removeFromChannel() {
    console.log(this.removeUserToChannelModal);
    debugger;
    if (this.addusertothischannel[0]._id && this.removeUserToChannelModal.users) {
      this.httpClient.post(serverURL+`api/removeUserFromChannel`,{
        channelId : this.addusertothischannel[0]._id ,
        userId:this.removeUserToChannelModal.users
      }).subscribe(data => {
        this.toastr.success(`User has been removed`, 'Remove User From Channel Success');
      }, error => {

      });
    }
  }

  createChannel() {
    console.log(this.createChannelModal);
     
    if (this.createChannelModal.name && this.createChannelModal.groupId) {
      this.channels.push({
        id: this.channels.length + 1,
        group: this.createChannelModal.groupId,
        users: [],
        name: this.createChannelModal.name,
      });
      console.log("createchannel",this.channels)
      this.httpClient.post(serverURL+`api/addchannel`, {
        channelId:this.channels.id,
        channelname: this.createChannelModal.name,
        groupId:this.createChannelModal.groupId,
        users:[],
      }).subscribe(data => {
        console.log(data);
        this.toastr.success(`Channel ${this.createChannelModal.name} has been created`, 'Create Channel Success');
        this.createChannelModal.name = '';
      }, error => {
      });
    }
  }

  addUserToAssis(user:any) {
    this.httpClient.post(serverURL+`api/promotUsertoGroupassis`, {
      userId: user._id,
      role: 2,
    }).subscribe(data => {
      this.users[user.id - 1] = data;
      this.toastr.success('', 'Change User to group Assis');
    }, error => {});
  }

  inviteUserToChannel() {

    if (this.inviteUserToChannelModel.channel && this.inviteUserToChannelModel.name) {
      this.httpClient.post(serverURL+'api/inviteUser', {
        
        name: this.inviteUserToChannelModel.name,
        email: this.inviteUserToChannelModel.email,
        channelId: this.inviteUserToChannelModel.channel,
      }).subscribe(data => {
         ;
     
      })
    }
  }

  removeUser(user: any) {
    this.httpClient.post(serverURL+`api/deleteuser`,{userId: user._id}).subscribe(data => {
      this.toastr.success(`User has been Removed`);
      this.users = data;
    });
  }

  makeGroupSuperAdmin(user: any,role:number) {
    
    this.httpClient.post(serverURL+`api/makeGrouporSuperAdmin`, {
      userId: user._id,
      role: role,
    }).subscribe(data => {
      this.users = data;
      this.toastr.success('', 'Change User to GroupAdmin');
    }, error => {});
  }


  getRole(role:any) {
    switch (role) {
      case 4:
        return 'super admin';
      case 3:
        return 'group admin';
      case 2:
        return 'group assis';
      default:
        return 'normal user';
    }
  }

}
