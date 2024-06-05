import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css'
})
export class NewAppointmentComponent {

  

  // bookForm= new FormGroup({
  //   uname: new FormControl([Validators.required, Validators.minLength(3)]),
  //   umobileNo: new FormControl(Validators.required),
  //   ucity: new FormControl(Validators.required),
  //   uage: new FormControl(Validators.required),
  //   ugender: new FormControl(Validators.required),
  //   uappointmentDate: new FormControl(Validators.required),
  //   uappointmentTime: new FormControl(Validators.required),
  //   uisFirstVisit: new FormControl(Validators.required),
  //   ucomment: new FormControl()
  // })

  appointmentObj: any = {
    "name": "",
    "mobileNo": "",
    "city": "",
    "age": "",
    "gender": "male",
    "appointmentDate": "",
    "appointmentTime": "",
    "isFirstVisit": true,
    "comment": ""
  };

  constructor(private master: MasterService){}

  onSaveAppointment() {
    this.master.createNew(this.appointmentObj).subscribe((resultData: any)=>
      {
        console.log(resultData);
        alert("Your appointment has been booked successfully.");
        
      });
  }
}