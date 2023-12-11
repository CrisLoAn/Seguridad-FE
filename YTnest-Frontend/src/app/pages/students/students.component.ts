import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/classes/student';
import { StudentService } from 'src/app/services/data/student.service';
import { PaginatorIntl } from 'src/app/services/paginator/paginator-intl.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}]
})
export class StudentsComponent implements OnInit, AfterViewInit {
  student: Student[] = [];
  page: number = 0;
  pageSize: number = 10;
  totalStudents: number = 0;
  totalPages: number = 0;
  
  displayedColumns: string[] = [
    'studentCedula',
    'Nombres',
    'studentGender',
    'studentProvince',
    'studentSemester',
    'studentMail',
    'studentPhone',
    'studentGSEC',
    'studentRepresentative',
  ];

  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentService: StudentService) {
    this.dataSource = new MatTableDataSource<Student>();
  }

  ngOnInit(): void {
   
    this.getStudents();
  }

  public getStudents() {
    this.studentService.findAllStudents().subscribe(
      studentData => {
       this.dataSource.data = studentData;
     //   this.totalStudents = studentData.totalElements;
     //   this.totalPages = studentData.totalPages;
        console.log("Estudent data", studentData);

      },
      error => {
        console.log('Error fetching students:', error);
      }
    );
  }

  public getStudentsByPage(numeroPagina:number, tamanio: number ) {
    
   // this.studentService.findAllStudents(numeroPagina, tamanio).subscribe(
  //    studentData => {
  //      console.log("student by page")
   //     console.log(studentData)
  //      this.dataSource.data = studentData.content;
  //      this.totalStudents = studentData.totalElements;
   //     this.totalPages = studentData.totalPages;
   //     console.log("after Estudent data", studentData);
   //   },
   //   error => {
   //     console.log('Error fetching students:', error);
    //  }
   // );
  }

  handlePageEvent(pageEvent: PageEvent): void{
    console.log("jalskdjlaksjdlakjs")
    console.log('handlePageEvent', pageEvent);
    this.page = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getStudentsByPage(pageEvent.pageIndex,  this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
