import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ViewLateReportCandidateComponent } from './components/view-late-report-candidate/view-late-report-candidate.component';
import { ViewLateReportComponent } from './components/view-late-report/view-late-report.component';
import { ViewCandidatesComponent } from './components/view-candidates/view-candidates.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { FacilitatorGuard } from './guards/facilitator.guard';
import { CandidateGuard } from './guards/candidate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'facilitator', redirectTo: '/facilitator/candidate', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'candidate', redirectTo: '/candidate/late-report-candidate', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'landing', component: LandingComponent,canActivate: [AuthGuard, FacilitatorGuard] },
  {
    path: 'candidate', component: HomeComponent,canActivate: [AuthGuard, CandidateGuard], children: [
      { path: 'late-report-candidate', component: ViewLateReportCandidateComponent },

    ]
  },
  {
    path: 'facilitator', component: HomeComponent,canActivate: [AuthGuard, FacilitatorGuard], children: [
      { path: 'late-report', component: ViewLateReportComponent },
      { path: 'candidate', component: ViewCandidatesComponent },

    ]
  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
