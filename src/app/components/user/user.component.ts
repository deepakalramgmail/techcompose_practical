import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userList: any[] = []
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  getUserList() {
    this.api._getUserList({}).subscribe(
      (res: any) => {
        if (res.status === 200 && res?.data.length > 0) {
          this.userList = res.data
        }
        else {
          this.userList = [];
        }
      },
      (err) => {
        console.error(err.message);
      })
  }
}
