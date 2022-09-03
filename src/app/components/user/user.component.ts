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
    this.getUserList();
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

  deleteRecord(user: any) {
    if (confirm("Are you sure want to delete")) {
      this.api._deleteRecord({ id: user.user_id }).subscribe(
        (res: any) => {
          if (res.status === 200) { this.getUserList(); alert("User deleted successfully") }
          else { console.error("res status not success", res) }
        }, (err) => { console.error(err.message) })
    }
    else {

    }
  }
}
