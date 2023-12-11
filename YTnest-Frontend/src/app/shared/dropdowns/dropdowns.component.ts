// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dropdowns',
//   templateUrl: './dropdowns.component.html',
//   styleUrls: ['./dropdowns.component.css'],
// })
// export class DropdownsComponent {
//   $(document).ready(function() {
//     $('.search_select_box select').selectpicker();
//   })
// }
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.css'],
})
export class DropdownsComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initializeSelectPicker();
  }

  private initializeSelectPicker() {
    // Buscar todos los elementos con la clase 'search_select_box select' y aplicar selectpicker
    const selectElements = document.querySelectorAll('.search_select_box select');
    selectElements.forEach((selectElement) => {
      
    });
  }
}
