import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-late-report',
  templateUrl: './view-late-report.component.html',
  styleUrls: ['./view-late-report.component.scss'],
  providers: [DatePipe]
})
export class ViewLateReportComponent implements AfterViewInit {
  currentUser: any
  lateReports: any[] = []
  currentClass: any
  displayedColumns: string[] = ['reportId', 'createdBy', 'timeEstimate', 'dateCreated', 'reason', 'arrivalTime', 'updatedBy', 'changeStatus'];
  dataSource!: MatTableDataSource<any>;

  constructor(private sharedService: SharedService, private datePipe: DatePipe, private excelService: ExportExcelService) {
    this.currentClass = this.sharedService.get('class', 'session')
    this.currentUser = this.sharedService.get('user', 'session')
    this.updateReports()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateReports() {
    const allLateReports = this.sharedService.get('lateReports', 'local') || []
    this.lateReports = allLateReports.filter((reports:any) => reports.classId === this.currentClass.classID)

    this.dataSource = new MatTableDataSource(this.lateReports);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  statusUpdate(status: string, reportId: string): void {
    this.lateReports.forEach((report: any, indx: number) => {
      if (report.reportId === reportId) {
        this.lateReports[indx]['status'] = status;
        this.lateReports[indx]['updatedBy'] = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        localStorage.setItem('lateReports', JSON.stringify(this.lateReports));
      }
    });

    this.updateReports();
  }

  exportToExcel(): void {
    const fileName = `late-report_${this.datePipe.transform(new Date(), 'dd-MM-YYYY')}.xlsx`;
    this.excelService.exportToExcel(fileName, this.dataSource.filteredData);
  }

}
