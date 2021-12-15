import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private formbuilder: FormBuilder) { }

  formValue!: FormGroup;
  employeeData!: any;
  showAdd!:boolean;
  showUpdate!:boolean;

  employeeModelObject: Employee  = new Employee();


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      designation: [''],
      department: [''],
    });
    this._getEmployeeList();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  


  private _getEmployeeList() {
    this.employeeService.get().subscribe(
      (data: Employee[]) => {
        this.employeeData = data;
      }
    );
  }

  deleteEmployee(row: any) {
    this.employeeService.delete(row.id).subscribe(data => {
      this._getEmployeeList();
    });
  }


  postEmployeeData() {
    this.employeeModelObject.name = this.formValue.value.name;
    this.employeeModelObject.designation = this.formValue.value.designation;
    this.employeeModelObject.department = this.formValue.value.department;

    this.employeeService.post(this.employeeModelObject).subscribe(data => {
      console.log(data);
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this._getEmployeeList();
    });
  }


  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObject.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['designation'].setValue(row.designation);
    this.formValue.controls['department'].setValue(row.department);
  }

  updateEmployeeData() {
    this.employeeModelObject.name = this.formValue.value.name;
    this.employeeModelObject.designation = this.formValue.value.designation;
    this.employeeModelObject.department = this.formValue.value.department;

    this.employeeService.update(this.employeeModelObject, this.employeeModelObject.id).subscribe(res => {
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this._getEmployeeList();
    });
  }







}
