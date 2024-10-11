import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private service:UserService){}

  ngOnInit(): void {
        this.loginForm = this.fb.group({
          email:'',
          password:''
        })
  }

  onSubmit():void{    
    this.service.userLogin(this.loginForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
      },
      error:(res:any)=>{
        console.log(res.error);
      }
    })

}
}
