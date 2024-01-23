import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-view-late-report-candidate',
  templateUrl: './view-late-report-candidate.component.html',
  styleUrls: ['./view-late-report-candidate.component.scss']
})
export class ViewLateReportCandidateComponent implements AfterViewInit {
  currentUser: any
  lateReports: any[] = []
  statuses:string[] = ['late', 'arrived', 'absent']
  displayedColumns: string[] = ['reportId', 'createdBy', 'timeEstimate', 'dateCreated', 'reason', 'arrivalTime', 'updatedBy', 'changeStatus'];
  dataSource!: MatTableDataSource<any>;

  constructor(private sharedService: SharedService, private snackbar: MatSnackBar, private dialog: MatDialog) {
    this.updateUser()
  }

  updateUser() {
    this.lateReports = this.sharedService.get('lateReports', 'local') || []
    this.currentUser = this.sharedService.get('user', 'session') || []

    this.lateReports = this.lateReports.filter((report:any) => report.createdByEmail.toLowerCase() === this.currentUser.email.toLowerCase())

    this.dataSource = new MatTableDataSource(this.lateReports);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addReports() {
    const dialogRef = this.dialog.open(SignInComponent)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateUser()
        this.snackbar.open(result, 'Ok', {duration: 2000})
      }
    })
  }

  statusUpdate(status: string, reportId:string): void {
    this.lateReports.forEach((report:any, indx: number) => {
      if(report.reportId === reportId) {
        if(status === 'arrived') {
          this.lateReports[indx]['arrivalTime'] = this.sharedService.getDateFromTime(new Date());
        }
        this.lateReports[indx]['status'] = status;
        this.lateReports[indx]['updatedBy'] = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
      }
    });

    localStorage.setItem('lateReports', JSON.stringify(this.lateReports));
    this.updateUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
