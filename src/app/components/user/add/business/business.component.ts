import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  businessDetails: any = {};

  constructor(private _fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
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
      this.api._addUserBusinessDetails({}).subscribe(
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
