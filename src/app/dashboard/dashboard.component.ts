import { Component } from '@angular/core';
import { faClipboardList, faFileImage ,faUserPlus , faComments } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  faClipboardList: any = faClipboardList
  faFileImage: any = faFileImage
  faUserPlus: any = faUserPlus
  faComments:any = faComments
}
