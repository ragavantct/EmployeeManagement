import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Dialog
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './employee-list.html'
})
export class EmployeeListComponent {

  employees: any[] = [];

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  
  openDialog(emp?: any, index?: number) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: emp
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULT:", result);

      if (result) {
        if (index != null) {
          result.id = emp.id;
          this.employees[index] = result; // edit
        } else {
          result.id = this.employees.length + 1;
          this.employees.push(result); // add
        }

        
        this.employees = [...this.employees];
        this.cdr.detectChanges();
      }
    });
  }

  
  edit(emp: any, i: number) {
    this.openDialog(emp, i);
  }

  
  delete(i: number) {
    if (confirm('Delete this employee?')) {
      this.employees.splice(i, 1);

      //  refresh UI
      this.employees = [...this.employees];
    }
  }
}