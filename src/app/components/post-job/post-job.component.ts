import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IJobForm } from '../../interfaces/jobForm';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  ngOnInit(): void {
    this.myForm = this.fb.group({
      jobtitle: '',
      tags: '',
      minimumSalary: '',
      maximumSalary: '',
      description: '',
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
      };

      this.service.submitForm(formData,'/job/post').subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

      // console.log(this.myForm.value);
      // console.log(this.jobRoleSelect.nativeElement.value)
      // console.log(this.minSalaryCurrency.nativeElement.value)
      // console.log(this.maxSalaryCurrency.nativeElement.value)
      // console.log(this.salaryOptions.nativeElement.value)
      // console.log(this.vacancies.nativeElement.value)
      // console.log(this.level.nativeElement.value)
      // console.log(this.country.nativeElement.value)
      // console.log(this.city.nativeElement.value)

    }
  }
}
