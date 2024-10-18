import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FindJobsComponent } from './components/find-jobs/find-jobs.component';

export const routes: Routes = [
    { path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'job/post',component:PostJobComponent},
    {path:'about',component:AboutUsComponent},
    {path:'contact',component:ContactUsComponent},
    {path:'find/jobs',component:FindJobsComponent},
    {path:'home',component:HomeComponent},
];
