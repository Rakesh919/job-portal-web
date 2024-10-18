import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { IJobForm } from '../../interfaces/jobForm';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,CalendarModule,MatDatepickerModule,MatNativeDateModule,MatInputModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: UserService) {}

  option: string = 'select..';

  date:any =''

  ngOnInit(): void {
    this.myForm = this.fb.group({
      jobtitle: '',
      tags: '',
      jobRole:['Entry level'],
      start_date:'',
      end_date:'',
      min_salary: '',
      min_salary_currency:['INR'],
      max_salary: '',
      max_salary_currency:['INR'],
      salary_options:['Negotiable'],
      vacancy:['1'],
      job_level:['Entry level'],
      country:['India'],
      city:'',
      job_description: '',
    });
  }


  onSubmit(): void {
    console.log(this.myForm.value)
    {
      const formData: IJobForm = {
        job_title: this.myForm.get('jobtitle')?.value,
        tags: [this.myForm.get('tags')?.value],
        job_role: this.myForm.get('tags')?.value,
        start_date:this.myForm.get('start_date')?.value,
        end_date:this.myForm.get('end_date')?.value,
        min_salary: this.myForm.get('min_salary')?.value,
        max_salary: this.myForm.get('max_salary')?.value,
        vacancies: this.myForm.get('vacancy')?.value,
        job_level: this.myForm.get('job_level')?.value,
        country: this.myForm.get('country')?.value,
        city: this.myForm.get('city')?.value,
        job_description: this.myForm.get('job_description')?.value,
        salary_options: this.myForm.get('salary_options')?.value,
        min_salary_currency:this.myForm.get('min_salary_currency')?.value,
        max_salary_currency:this.myForm.get('max_salary_currency')?.value
      };

      this.service.jobPost(formData).subscribe({
        next:(res:any)=>{
          console.log(res)
        },
        error:(res:any)=>{
          console.log(res.error)
        }
      })

    }
  }

}
