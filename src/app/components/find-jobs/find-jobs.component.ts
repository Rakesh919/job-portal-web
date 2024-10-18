import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-jobs',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './find-jobs.component.html',
  styleUrl: './find-jobs.component.css'
})
export class FindJobsComponent implements OnInit{

   jobDetails:any ={}

  ngOnInit(): void {
    this.allAvailableJobs()
  }

  constructor(private service:UserService){}

  allAvailableJobs(){
   this.service.getAllJobs().subscribe({
    next:(res:any)=>{
      this.jobDetails = res;
      console.log(res);
    },
    error:(res:any)=>{
      console.log(res.error)
    }
   })
  }
}
