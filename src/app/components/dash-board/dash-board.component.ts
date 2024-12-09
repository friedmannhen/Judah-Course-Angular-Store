import { Component } from '@angular/core';
import { AddFormComponent } from '../add-form/add-form.component';

@Component({
  selector: 'app-dash-board',
  standalone:true,
  imports: [AddFormComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {

}
