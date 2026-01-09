import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Table} from './components/table/table';

@Component({
  selector: 'app-root',
  imports: [Table],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
