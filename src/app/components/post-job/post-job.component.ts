import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IJobForm } from '../../interfaces/jobForm';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,CalendarModule,MatDatepickerModule,MatNativeDateModule,MatInputModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent implements OnInit {
  myForm!: FormGroup;

  @ViewChild('selectJobRole') jobRoleSelect!: ElementRef;
  @ViewChild('minSalary') minSalaryCurrency!: ElementRef;
  @ViewChild('maxSalary') maxSalaryCurrency!: ElementRef;
  @ViewChild('salaryOptions') salaryOptions!: ElementRef;
  @ViewChild('vacancy') vacancies!: ElementRef;
  @ViewChild('jobLevel') level!: ElementRef;
  @ViewChild('country') country!: ElementRef;
  @ViewChild('city') city!: ElementRef;

  constructor(private fb: FormBuilder, private service: UserService) {}

  option: string = 'select..';

  date:any =''

  ngOnInit(): void {
    this.myForm = this.fb.group({
      jobtitle: '',
      tags: '',
      minimumSalary: '',
      maximumSalary: '',
      description: '',
      date:''
    });
  }

  onSubmit(): void {
    {
      const formData: IJobForm = {
        job_title: this.myForm.get('jobtitle')?.value,
        tags: this.myForm.get('tags')?.value,
        job_role: [this.jobRoleSelect.nativeElement.value],
        min_salary: this.myForm.get('minSalary')?.value,
        max_salary: this.myForm.get('maxSalary')?.value,
        vacancies: this.vacancies.nativeElement.value,
        job_level: this.level.nativeElement.value,
        country: this.country.nativeElement.value,
        city: this.city.nativeElement.value,
        job_description: this.myForm.get('description')?.value,
        salary_options: this.salaryOptions.nativeElement.value,
        apply_before:this.myForm.get('date')?.value
      };


      this.service.submitForm(formData,'/job/post').subscribe({
        next:(res:any)=>{
          console.log(res)
        },
        error:(res:any)=>{
          console.log(res.error)
        }
      })

    }
  }

  openDatePicker() {
    const dateInput = document.getElementById('start-input') as HTMLInputElement;
    if (dateInput) {
      dateInput.showPicker(); // Opens the date picker
    }
  }
}
