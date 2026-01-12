import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table } from './components/table/table';
import { Column } from './components/column/column';
import { MatButtonModule } from '@angular/material/button';
import { PredefinedTemplate } from './components/predefined-template/predefined-template';
import { EditButtonTray } from './components/cell-actions/edit-button-tray/edit-button-tray';
import { TableToolbar } from './components/table-toolbar/table-toolbar';
import { MatCardModule } from '@angular/material/card';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  subElemnt: { subValue: string };
}

@Component({
  selector: 'app-root',
  imports: [
    Table,
    Column,
    MatButtonModule,
    PredefinedTemplate,
    EditButtonTray,
    TableToolbar,
    MatCardModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  elementData: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', subElemnt: { subValue: 'hell' } },
    {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      subElemnt: {
        subValue: 'no',
      },
    },
    {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      subElemnt: {
        subValue: 'bro',
      },
    },
    {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      subElemnt: {
        subValue: 'what',
      },
    },
    {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      subElemnt: {
        subValue: 'are',
      },
    },
    {
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      subElemnt: {
        subValue: 'you',
      },
    },
    {
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      subElemnt: {
        subValue: 'doing',
      },
    },
    {
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      subElemnt: {
        subValue: 'seriously',
      },
    },
    {
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      subElemnt: {
        subValue: 'your',
      },
    },
    {
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      subElemnt: {
        subValue: 'crazy',
      },
    },
  ];

  subElemntAccessor(element: PeriodicElement) {
    return element.subElemnt.subValue;
  }

  tableAction(elements: PeriodicElement[]) {
    console.log('elements', elements);
  }

  myAction(element: PeriodicElement) {
    console.log('element', element);
  }

  globalAction(elements: PeriodicElement[]) {
    console.log('global action', elements);
  }

  displayedColumnsLog(displayedColumns: string[]) {
    console.log('displayed columns', displayedColumns);
  }

  modifyElem(elem: PeriodicElement) {
    elem.subElemnt.subValue = elem.subElemnt.subValue + 'hello';
  }
}
