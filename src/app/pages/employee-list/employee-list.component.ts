import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import {
  APP_ROUTES,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS
} from '../../constants/employee.constants';
import {
  loadEmployeeListFilter,
  saveEmployeeListFilter
} from '../../utils/employee-filter.storage';
import {
  showEmployeeDeletedToast,
  showEmployeeUpdatedToast
} from '../../utils/employee-toast';
import { LucideIconComponent } from '../../shared/lucide-icon.component';

const EDIT_EMPLOYEE_DIALOG_ID = 'edit-employee-dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    LucideIconComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly dialog = inject(MatDialog);

  readonly displayedColumns = [
    'id',
    'username',
    'name',
    'email',
    'status',
    'group',
    'action'
  ] as const;

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  dataSource = new MatTableDataSource<Employee>();

  usernameFilter = '';
  emailFilter = '';
  pageSize = DEFAULT_PAGE_SIZE;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.restoreFilters();
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.connectTableHelpers();
  }

  navigateToAddEmployee(): void {
    this.router.navigate([APP_ROUTES.addEmployee]);
  }

  viewDetail(employee: Employee): void {
    this.router.navigate([APP_ROUTES.employeeDetail(employee.id)]);
  }

  editEmployee(employee: Employee): void {
    if (this.dialog.getDialogById(EDIT_EMPLOYEE_DIALOG_ID)) {
      return;
    }

    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      id: EDIT_EMPLOYEE_DIALOG_ID,
      width: '900px',
      disableClose: true,
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const updatedEmployee = result as Employee;
      this.employeeService.updateEmployee(updatedEmployee);
      this.refreshTable();
      showEmployeeUpdatedToast(this.toastr, updatedEmployee);
    });
  }

  deleteEmployee(employee: Employee): void {
    Swal.fire({
      title: 'Hapus data karyawan?',
      text: `${employee.firstName} ${employee.lastName} akan dihapus dari daftar karyawan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: false,
      iconColor: '#d92d20',
      width: 420,
      padding: '28px',
      backdrop: 'rgba(16, 37, 68, 0.48)',
      customClass: {
        popup: 'delete-confirm-popup',
        title: 'delete-confirm-title',
        htmlContainer: 'delete-confirm-message',
        icon: 'delete-confirm-icon',
        actions: 'delete-confirm-actions',
        confirmButton: 'delete-confirm-button',
        cancelButton: 'delete-cancel-button'
      }
    }).then(result => {
      if (!result.isConfirmed) {
        return;
      }

      this.employeeService.deleteEmployee(employee.id);
      this.refreshTable();
      showEmployeeDeletedToast(this.toastr, employee);
    });
  }

  applyFilter(): void {
    saveEmployeeListFilter({
      username: this.usernameFilter,
      email: this.emailFilter
    });

    this.dataSource.data = this.getFilteredEmployees();
    this.connectTableHelpers();
  }

  changePageSize(): void {
    if (!this.paginator) {
      return;
    }

    this.paginator.pageSize = this.pageSize;
    this.paginator.firstPage();
  }

  private restoreFilters(): void {
    const savedFilter = loadEmployeeListFilter();
    this.usernameFilter = savedFilter.username;
    this.emailFilter = savedFilter.email;
  }

  private loadEmployees(): void {
    this.dataSource.data = this.getFilteredEmployees();
  }

  private refreshTable(): void {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    this.dataSource.data = this.getFilteredEmployees();
    this.connectTableHelpers();

    if (this.paginator) {
      const lastPageIndex = Math.max(0, this.paginator.getNumberOfPages() - 1);
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = Math.min(pageIndex, lastPageIndex);
    }
  }

  private getFilteredEmployees(): Employee[] {
    return this.employeeService
      .getEmployees()
      .filter(employee => this.matchesFilters(employee));
  }

  private matchesFilters(employee: Employee): boolean {
    const usernameQuery = this.usernameFilter.toLowerCase();
    const emailQuery = this.emailFilter.toLowerCase();

    const usernameMatch = employee.username
      .toLowerCase()
      .includes(usernameQuery);
    const emailMatch = employee.email.toLowerCase().includes(emailQuery);

    return usernameMatch && emailMatch;
  }

  private connectTableHelpers(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
