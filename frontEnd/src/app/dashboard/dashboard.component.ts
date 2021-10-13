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
    userId: [{}],
    addToChannelGroupUsers:[],
    addToChannelChannels: [{}],
  } ;

  removeUserToChannelModal = {
    channelId: null,
    userId: null,
    removeToChannelGroupUsers: [],
    removeToChannelChannels: [],
  } || [];

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log("dashboard",this.user);
    this.getMyGroups();
    this.getAllUsers();
    this.getAllGroups();
    this.getAllChannels();
    this.isSuperAdmin();
  
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
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

  getMyGroups() {
    
    userdata = JSON.parse(this.user)
    this.httpClient.get(serverURL+`api/groups/user/${userdata.id}`).subscribe(data => {
      console.log(data);
      this.myGroups = data;
    }, error => {

    });
  }
  selectgroupid(group:any){

    this.addusertothischannel = this.channels.filter((item: { groupId: any; }) => item.groupId === group._id)

  }
  onGroupSelectChange(type:any, group:any) {
    console.log(type);
    console.log(group);
    if (type === 'createChannel') {
    debugger
      this.createChannelModal.groupId = group._id;
      console.log(this.createChannelModal);
    } else if (type === 'addUserToChannel') {
      debugger
      this.addUserToChannelModal.addToChannelChannels = this.channels.filter((item: { groupId: any; }) => item.groupId === group._id);
      this.addUserToChannelModal.userId = [...this.users];
      debugger
    } else if (type === 'removeUserFromChannel') {
      this.removeUserToChannelModal.removeToChannelChannels = this.channels.filter((item: { group: any; }) => item.group === group.id);
    } else if (type === 'inviteUserToChannel') {
       ;
      this.inviteUserToChannelModel.channels = this.channels.filter((item: { group: any; }) => item.group === group.id);
    }
  }

  onChannelSelectChange(type:any, channel:any) {
    if (type === 'removeUserFromChannel') {
       ;
      this.removeUserToChannelModal.removeToChannelGroupUsers = channel.users.map((item: number) => this.users.userData[item - 1]);
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
    debugger;
    if (type === 'addUserToChannel') {
      this.addUserToChannelModal.userId = user.id;
    }
    if (type === 'removeUserFromChannel') {
      this.removeUserToChannelModal.userId = user.id;
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
    console.log(group);
     
    this.httpClient.delete(serverURL+`api/groups/${group.id}`).subscribe(data => {
     // alert(this.groups, item => item.id === group.id);
      this.toastr.success(`Group has been removed`, '');
    }, error => {

    });
  }

  addUserToChannel() {
      if (this.addUserToChannelModal.channelId && this.addUserToChannelModal.userId) {
      console.log(this.addUserToChannelModal);
     // this.channels[this.addUserToChannelModal.channelId - 1].users.push(this.addUserToChannelModal.userId);
      this.httpClient.put(serverURL+`api/channels/${this.addUserToChannelModal.channelId}`, {
        userId: this.addUserToChannelModal.userId,
      }).subscribe(data => {
        this.toastr.success(`User has been added`, 'Add User To Channel Success');
      }, error => {

      });
    }
  }

  removeFromChannel() {
    console.log(this.removeUserToChannelModal);
    if (this.removeUserToChannelModal.channelId && this.removeUserToChannelModal.userId) {
    //  remove(this.channels[this.removeUserToChannelModal.channelId - 1].users, item => item === this.removeUserToChannelModal.userId);
      this.removeUserToChannelModal.removeToChannelGroupUsers = [];
      this.httpClient.get(serverURL+`api/channels/${this.removeUserToChannelModal.channelId}/users/${this.removeUserToChannelModal.userId}`).subscribe(data => {
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
      userId: user.userId,
      role: 2,
    }).subscribe(data => {
      this.users[user.id - 1] = data;
      this.toastr.success('', 'Change User to Assis');
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

  removeUser(user: Users) {
    this.httpClient.delete(serverURL+`api/users/${user.id}`).subscribe(data => {
      this.toastr.success(`User has been Removed`);
    });
  }

  makeGroupAdmin(user: any) {
    this.httpClient.put(serverURL+`api/users/${user.id}`, {
      role: 3,
    }).subscribe(data => {
      this.users[user.id - 1] = data;
      this.toastr.success('', 'Change User to GroupAdmin');
    }, error => {});
  }

  makeSuperAdmin(user: any) {
    this.httpClient.put(serverURL+`api/users/${user.id}`, {
      role: 4,
    }).subscribe(data => {
      this.users[user.id - 1] = data;
      this.toastr.success('', 'Change User to SuperAdmin');
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
