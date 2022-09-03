import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personalDetails: any = {};
  constructor(private _fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.personalDetails = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      dob: ['', [Validators.required]],
      contactno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.personalDetails.invalid) {
      this.personalDetails.markAllAsTouched();
      console.error("form invalid");
    }
    else {
      this.api._addUserPersonalDetails(this.personalDetails.value).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.personalDetails.reset();
            alert("data added success fully")
          }
          else { console.log("res status failed", res.message) }
        },
        (err) => {
          console.error(err.message);
        })
    }
  }

}
