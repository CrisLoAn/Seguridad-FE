import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorIntl extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number)=>
  {
    console.log("PAGINATORRRRRRR")
    console.log(page)
    console.log(pageSize)
    console.log(length)
    
    return `Page ${page + 1} of ${Math.ceil(length/pageSize)}`
  }
}
