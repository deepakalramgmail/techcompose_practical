import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  businessDetails: any = {};

  constructor(private _fb: FormBuilder, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('user_id')) { alert("you need to first fill perosnal details then business details"); this.router.navigate(['/user/add/personal']) }
    this.formInit()
  }

  formInit() {
    this.businessDetails = this._fb.group({
      business_name: ['', [Validators.required]],
      branches: this._fb.array([])
    })
  }

  get branches() {
    return this.businessDetails.controls['branches'] as FormArray;
  }

  addBranch() {
    const branch = this._fb.group({
      area_name: ['', [Validators.required]],
      contactno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    })
    this.branches.push(branch);
  }

  removeBrnach(indexNumber: number) {
    this.branches.removeAt(indexNumber);
  }

  onSubmit() {
    if (this.businessDetails.invalid) {
      this.businessDetails.markAllAsTouched();
      console.log("invalid form");
    }
    else {
      const req = {
        name:this.businessDetails.value.business_name,
        branches:JSON.stringify(this.businessDetails.value.branches),
        user_id:localStorage.getItem('user_id'),
      }
      this.api._addUserBusinessDetails(req).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.businessDetails.reset();
            this.branches.clear();
          }
          else {
            console.error("res status failed", res);
          }
        },
        (err) => {
          console.log("", err.message);
        })
      this.businessDetails.reset();
      this.branches.clear();
    }
  }
}
