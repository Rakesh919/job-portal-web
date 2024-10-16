import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputComponent } from 'ngx-otp-input';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgxOtpInputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder,private service:UserService,private cd:ChangeDetectorRef) {}

  signupUser!: FormGroup;
  validatePhoneNumber: Number = 0;
  otpId :string = ''
  otp:string = ''
  employerFieldsVisiblity:boolean = false;

  ngOnInit(): void {
    this.signupUser = this.fb.group({
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      otp: '',
      userRole: ['EMPLOYEE'],
      companyName: '',
      image: ''
    });
  
    this.cd.detectChanges();
  
    console.log(this.signupUser.value);
  }
  

  otpInputVisiblity: boolean = false;
  isVisible:boolean = false;
  isEnabled:boolean = false;

  otpOptions = {
    otpLength: 4,
    autoFocus: true,
  };

  validateLength(event: any): void {
    const value = event.target.value;
    
    if (!/^([6-9])[0-9]*$/.test(value)) {
      event.target.value = '';
      this.otpInputVisiblity = false;
      return;
    }
  
    if (value.length > 10) {
      event.target.value = value.slice(0, 10);
    }
else
    this.otpInputVisiblity = value.length === 10;
  }
  

  validatePassword(event: any): void {
    if (event.target.value.length > 20) {
      event.target.value = event.target.value.slice(0, 20);
    }
  }

  sendOtp(){
    console.log('send otp started')
    let phoneNumber = this.signupUser.get('phoneNumber')?.value;      
    this.service.generateOtp('+91'+phoneNumber).subscribe({
      next: (res: any) => {
        console.log(res);
        this.otpId= res.otpId;
       if(res.success) {
        this.isVisible = true;
        this.isEnabled = true;
        this.cd.detectChanges();
       }
        
      },
      error: (res: any) => {
        console.log(res.error);
      },
    })
  }

  onSubmit(): void {
    let data = {
      name:this.signupUser.get('name')?.value,
      email:this.signupUser.get('email')?.value,
      password:this.signupUser.get('password')?.value,
      phoneNumber:String('+91'+this.signupUser.get('phoneNumber')?.value),
      otp:this.otp,
      otpId:this.otpId,
      userRole:this.signupUser.get('userRole')?.value
    }
    console.log(data)
    this.service.addUser(data).subscribe({
      next:(res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.token)
      },
      error:(res:any)=>{
        console.log(res.error);
      }
    })
  }

  getOtp(event:any):void{
    if(event.target.value>=0){ 
      let otpInput = this.otp+event.target.value;
      this.otp = otpInput
    }
    
  }

  getUserRole(event:any){
   if(event.target.value ==='EMPLOYER'){
    this.employerFieldsVisiblity = !this.employerFieldsVisiblity;
   }
   else{
    this.employerFieldsVisiblity = !this.employerFieldsVisiblity
   }
  }


}
