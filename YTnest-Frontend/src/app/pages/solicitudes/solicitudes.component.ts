import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudesService } from 'src/app/services/data/solicitudes.service';

import { Repository } from 'src/app/classes/repository';
import { studentRecord } from 'src/app/classes/record';
import { StudentResidences } from 'src/app/classes/student-residence';
import { Residence } from 'src/app/classes/residence';
import { Cost } from 'src/app/classes/cost';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
})
export class SolicitudesComponent implements OnInit {
  studentsData: Repository[] = [];
  recordsData: studentRecord[] = [];
  studentResidencesData: StudentResidences[] = [];
  residencesData: Residence[] = [];
  costsData: Cost[] = [];

  elementsNumber: number;

  //Modal reubicar
  showModal = false; // Propiedad para controlar la visualización del modal.
  selectedResidenceId: number | null = null; // Variable para almacenar la residencia seleccionada.

  selectedStudentId: number | null = null;
  sr1: number | null = null; // Inicializamos en null o con el valor por defecto que desees
  @ViewChild('modal') modal: any;

  //paginador
  elementsPerPage = 10;
  currentPage = 1;

  //filtro busqueda
  searchTerm: string = '';
  filteredStudentsData: Repository[] = [];

  constructor(
    private solicitudesService: SolicitudesService,
    private http: HttpClient,
    public service: SolicitudesService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.filterStudents();
  }
  // Funcion Obtener los datos de Students
  private getStudents() {
    this.solicitudesService.findAllStudents().subscribe(
      (studentData) => {
        this.studentsData = studentData;
        this.loadRecords();
        this.loadStudentResidences();
        this.loadResidences();
        this.loadCosts();
        this.filteredStudentsData = [...this.studentsData].sort();
        this.elementsNumber = this.filteredStudentsData.length;
      },
      (error) => {
        console.error('Error fetching students data:', error);
      }
    );
  }
  // Funcion para Obtener los records
  private loadRecords() {
    this.solicitudesService.findAllRecords().subscribe(
      (records) => {
        this.recordsData = records;
        //console.log('Records Data:', this.recordsData);
      },
      (error) => {
        console.error('Error fetching records data:', error);
      }
    );
  }
  // Funcion para Obtener los StudentsResidences
  private loadStudentResidences() {
    this.solicitudesService.findAllStudentResidences().subscribe(
      (studentResidences) => {
        this.studentResidencesData = studentResidences;
        //console.log('Student Residences Data:', this.studentResidencesData);
      },
      (error) => {
        console.error('Error fetching student residences data:', error);
      }
    );
  }
  // Funcion para Obtener los Residences
  private loadResidences() {
    this.solicitudesService.findAllResidences().subscribe(
      (residences) => {
        this.residencesData = residences;
        //console.log('Residences Data:', this.residencesData);
      },
      (error) => {
        console.error('Error fetching residences data:', error);
      }
    );
  }
  // Funcion para Obtener los Costos
  private loadCosts() {
    this.solicitudesService.findAllCosts().subscribe(
      (costs) => {
        this.costsData = costs;
        console.log('Costs Data:', this.costsData);
      },
      (error) => {
        console.error('Error fetching costs data:', error);
      }
    );
  }

  // Funciones para obtener el residenceCode:
  // Esta funcion compara si la fecha endDealDate es superior a la actual
  isDateValid(timestamp: number | null): boolean {
    return timestamp === null;
  }


  // Esta funcion compara los student_id y residence_id para ver a quien le pertence y
  // aplica la funcion de arriba para verificar que aun pertenezca a la residencia
  getResidenceCode(student_id: number): string | null {
    const index = this.studentResidencesData.findIndex(item => item.student_id === student_id);


    const filteredStudentResidencesData = this.studentResidencesData.filter(
      (residence) => residence.student_id === student_id
    );

    const validResidencesData = filteredStudentResidencesData.filter(
      (residence) => this.isDateValid(residence.ednDateDeal)
    );

    if (validResidencesData.length === 0) {
      return null;
    }

    const validResidence = validResidencesData.find(
      (residence) =>
        residence.residenceId === validResidencesData[0].residenceId
    );

    if (!validResidence) {
      return null;
    }

    const residence = this.residencesData.find(
      (res) => res.residenceId === validResidence.residenceId
    );
    
    return residence ? residence.residenceCode : null;
  }

  eliminarFila(index: number) {
    this.filteredStudentsData.splice(index, 1);
    this.filterStudents();
    this.updateFilteredStudentsData();
  }


  
  // Funciones para obtener el Score:
  //comparo student_id con record_id para obtener el score

  hasRecord(student_id: number): boolean {
    return this.recordsData.some((record) => record.student_id === student_id);
  }

  getScore(student_id: number): number {
    const record = this.recordsData.find(
      (record) => record.student_id === student_id
    );
    return record ? record.score : 0; // Puedes cambiar 0 por un valor predeterminado si no se encuentra el registro.
  }
  //Score color
  getScoreStyle(score: number): string {
    if (score >= 9 && score <= 10) {
      return 'score-green';
    } else if (score >= 7 && score <= 8) {
      return 'score-blue';
    } else if (score >= 5 && score <= 6) {
      return 'score-yellow';
    } else if (score >= 3 && score <= 4) {
      return 'score-orange';
    } else {
      return 'score-red';
    }
  }

  // Obtener los costos

  getCostPrice(student_id: number): number | null {
    const residenceCode = this.getResidenceCode(student_id);
    if (!residenceCode) {
      return null;
    }

    const residence = this.residencesData.find(
      (res) => res.residenceCode === residenceCode
    );
    if (!residence) {
      return null;
    }

    const cost_id = residence.cost_id;
    const cost = this.costsData.find((cost) => cost.cost_id === cost_id);
    return cost ? cost.costPrice : null;
  }

  // filtro de busqueda
  // Función para filtrar estudiantes según el término de búsqueda
  filterStudents() {
    if (!this.searchTerm.trim()) {
      this.filteredStudentsData = this.studentsData;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredStudentsData = this.studentsData.filter((student) =>
        this.containsSearchTerm(student, searchTermLower)
      );
    }
  }
  // Función para verificar si el término de búsqueda está presente en algún campo del estudiante.
  private containsSearchTerm(
    student: Repository,
    searchTermLower: string
  ): boolean {
    return (
      student.studentCedula.toLowerCase().includes(searchTermLower) ||
      (student.studentLastName.toLowerCase() +" "+student.studentSecondSurname.toLowerCase()).includes(searchTermLower) ||
      (student.studentFirstName.toLowerCase() +" "+
      student.studentMiddleName.toLowerCase()).includes(searchTermLower) ||
      student.studentMail.toLowerCase().includes(searchTermLower) ||
      student.studentPhone.toLowerCase().includes(searchTermLower) ||
      this.containsResidenceCode(student, searchTermLower)||
      student.studentLastName.toLowerCase().includes(searchTermLower) ||
      student.studentSecondSurname.toLowerCase().includes(searchTermLower)||
      student.studentLastName.toLowerCase().includes(searchTermLower)||
      student.studentMiddleName.toLowerCase().includes(searchTermLower)
    );
  }
// Este método filtra los estudiantes que tienen una casa asociada
  filterStudentsWithResidence() {
    this.studentsData = this.studentsData.filter((student) => {
      return this.studentResidencesData.some(
        (residence) => residence.student_id === student.student_id
      );
    });
  }

  // Función para verificar si el término de búsqueda está presente en el residence code del estudiante.
  private containsResidenceCode(
    student: Repository,
    searchTermLower: string
  ): boolean {
    const residenceCode = this.getResidenceCode(student.student_id);
    return (
      !!residenceCode && residenceCode.toLowerCase().includes(searchTermLower)
    );
  }

  // PAGINADOR
  onPageChange(page: number) {
    this.currentPage = page;
  }

  updateFilteredStudentsData() {
    const startIndex = (this.currentPage - 1) * this.elementsPerPage;
    const endIndex = startIndex + this.elementsPerPage;
    this.filteredStudentsData = this.studentsData
      .slice(startIndex, endIndex)
      .filter((student) =>
        this.containsSearchTerm(student, this.searchTerm.toLowerCase())
      );
    // Actualiza el número total de elementos en el paginador
    this.elementsNumber = this.elementsNumber - 1;

  }

  /// REUBICAR ---------------------------------------------------------------------------------
  openModal(studentId: number) {
    // Aquí puedes utilizar el studentId para realizar acciones en el modal
    this.selectedStudentId = studentId;
    console.log(
      'Se hizo clic en el botón Reubicar para el student_id:',
      this.selectedStudentId
    );
    this.showModal = true;
    this.loadResidences;
    console.log('Modal abierto');
  }

  // Método para cerrar el modal
  closeModal() {
    console.log(
      'Se hizo clic en el botón Reubicar para el student_id:',
      this.selectedStudentId
    );
    this.showModal = false;
  }

  // Obtener los detalles de la residencia seleccionada
  getResidenceCapacity(selectedResidenceId: number): number {
    const selectedIdNumber = Number(selectedResidenceId);
    const residence = this.residencesData.find(
      (residence) => residence.residenceId === selectedIdNumber
    );
    if (residence) {
      console.log('Residence Capacity:', residence.residenceCapacity);
      return residence.residenceCapacity;
    } else {
      // Puedes cambiar 0 por un valor predeterminado si no se encuentra la residencia.
      console.log(
        'Residence not found for selectedResidenceId:',
        selectedResidenceId
      );
      return 0; // O un valor predeterminado si se desea.
    }
  }

  getResidenceCostPrice(selectedResidenceId: number): number {
    const selectedIdNumber = Number(selectedResidenceId);
    const residence = this.residencesData.find(
      (residence) => residence.residenceId === selectedIdNumber
    );
    const cost = residence?.cost_id;
    const costId = this.costsData.find((costId) => costId.cost_id === cost);
    if (costId) {
      console.log('Costo:', costId.costPrice);
      return costId.costPrice;
    } else {
      // Puedes cambiar 0 por un valor predeterminado si no se encuentra la residencia.
      console.log('Costo not found for selectedResidenceId:', costId);
      return 0; // O un valor predeterminado si se desea.
    }
  }

  getResidenceLocation(selectedResidenceId: number): string {
    const selectedIdNumber = Number(selectedResidenceId);
    const residence = this.residencesData.find(
      (residence) => residence.residenceId === selectedIdNumber
    );
    if (residence) {
      console.log('Residence Location:', residence.residenceLocation);
      return residence.residenceLocation.toString();
    } else {
      // Puedes cambiar 0 por un valor predeterminado si no se encuentra la residencia.
      console.log(
        'Residence not found for selectedResidenceId:',
        selectedResidenceId
      );
      return 'Not found'; // O un valor predeterminado si se desea.
    }
  }

  getResidenceArea(selectedResidenceId: number): number {
    const selectedIdNumber = Number(selectedResidenceId);
    const residence = this.residencesData.find(
      (residence) => residence.residenceId === selectedIdNumber
    );
    if (residence) {
      console.log('Residence Area:', residence.residenceArea);
      return residence.residenceArea;
    } else {
      // Puedes cambiar 0 por un valor predeterminado si no se encuentra la residencia.
      console.log(
        'Residence not found for selectedResidenceId:',
        selectedResidenceId
      );
      return 0; // O un valor predeterminado si se desea.
    }
  }
  getResidenceGender(selectedResidenceId: number): string {
    const selectedIdNumber = Number(selectedResidenceId);
    const residence = this.residencesData.find(
      (residence) => residence.residenceId === selectedIdNumber
    );
    if (residence) {
      console.log('Residence Gender:', residence.residenceGender);
      return residence.residenceGender.toString();
    } else {
      // Puedes cambiar 0 por un valor predeterminado si no se encuentra la residencia.
      console.log(
        'Residence not found for selectedResidenceId:',
        selectedResidenceId
      );
      return 'Not found'; // O un valor predeterminado si se desea.
    }
  }

  //ObtenerLas residencias disponibles

  getAvailableResidences(): any[] {
    return this.residencesData.filter(
      (residence) => residence.residenceAvailability === 'A'
    );
  }

  // boton Guardar

  reubicarEstudiante(
    selectedResidenceId: number | null,
    studentId: number | null
  ) {
    if (selectedResidenceId !== null && studentId !== null) {
      const selectedIdNumber = Number(selectedResidenceId);
      const studentIdNumber = Number(studentId);
      console.log('residenceID', selectedIdNumber);
      console.log('StudentID', studentIdNumber);

      // Paso 1: Filtrar solo los estudiantes con ednDateDeal en null
      const studentsWithNullEndDateDeal = this.studentResidencesData.filter(
        (studentResidence) => studentResidence.ednDateDeal === null
      );
      console.log('studentWith null', studentsWithNullEndDateDeal);
      // Paso 2: Buscar el studentResidence que tiene el studentId igual al valor ingresado en la función
      const studentResidenceToUpdate = studentsWithNullEndDateDeal.find(
        (studentResidence) => studentResidence.student_id === studentIdNumber
      );

      if (studentResidenceToUpdate) {
        // Actualizar el residenceId con el valor ingresado en la función
        studentResidenceToUpdate.residenceId = selectedIdNumber;

        const currentDate = new Date().getTime();

        const updatedStudentResidence: StudentResidences = {
          ...studentResidenceToUpdate,
          ednDateDeal: null, // Mantenemos ednDateDeal como null
        };

        // Realizar la actualización en el backend
        this.http
          .put(
            `${this.solicitudesService.backendURL}/studentsResidences/${updatedStudentResidence.studentResidenceId}`,
            updatedStudentResidence
          )

          .subscribe(
            () => {
              console.log(
                this.solicitudesService.backendURL,
                '/studentsResidences/',
                updatedStudentResidence.studentResidenceId
              );
              console.log('Campo actualizado en studentResidencesData');
            },
            (error) => {
              console.error('Error actualizando ednDateDeal:', error);
            }
          );
      } else {
        console.error(
          'No se encontró un estudiante con ednDateDeal en null y studentId igual al valor ingresado en la función.'
        );
      }
    }

    //window.location.reload();
    this.closeModal();
  }
}
