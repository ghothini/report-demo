import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  exportToExcel(fileName:string, dataSource:any): void {
    // Get the table data as a 2D array
    const tableData: any[][] = this.convertJsonTo2D(dataSource);

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(tableData);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, fileName);
  }

  convertJsonTo2D(jsonData: any[]) {
    const tableData: any[][] = [];
    const headers = Object.keys(jsonData[0]).map(key => this.camelCaseToTitleCase(key));
    tableData.push(headers); // Add headers

    jsonData.forEach(item => {
      tableData.push(Object.values(item));
    });

    return tableData;
  }

  camelCaseToTitleCase(input: string): string {
    // Ensure the input is not empty
    if (!input) return '';
    // Add a space before each capital letter
    const spacedString = input.replace(/([A-Z])/g, ' $1');
    // Capitalize the first letter and remove leading space
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1).trim();
  }
}
