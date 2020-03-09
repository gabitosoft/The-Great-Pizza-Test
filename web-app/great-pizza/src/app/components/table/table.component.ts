import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit {

  dataSource: MatTableDataSource<T>;
  selection = new SelectionModel<T>(true, []);

  displayedColumns = ['select'];

  model: T;

  @Input()
  items: Array<T> = [];

  fields: Array<string> = [];

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);
    console.log('datasource', this.dataSource);
    if (this.dataSource.data.length > 0) {
      this.setupColumns();
    }
  }

  setupColumns() {
    this.fields = Object.getOwnPropertyNames(this.items[0]);
    this.fields.forEach(field => {
      this.displayedColumns.push(field);
    });
    this.displayedColumns.push('actions');
  }

  editItem() {
    //
  }

  removeItem() {
    //
  }

  getFieldTitle(fieldName: string) {
    let newFieldName = fieldName.replace('_', '');
    newFieldName = newFieldName.toLowerCase().charAt(0).toUpperCase() + newFieldName.slice(1);
    return newFieldName;
  }

  getFieldName(row: any) {
    return Object.getOwnPropertyNames(row);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ 1}`;
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  selectAll() {
    this.items.map(t => t['selected'] = true);
  }

}
