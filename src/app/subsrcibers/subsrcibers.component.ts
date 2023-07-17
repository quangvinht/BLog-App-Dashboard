import { Component, OnInit } from '@angular/core';
import { SubsrcibersService } from '../services/subsrcibers.service';

@Component({
  selector: 'app-subsrcibers',
  templateUrl: './subsrcibers.component.html',
  styleUrls: ['./subsrcibers.component.css'],
})
export class SubsrcibersComponent implements OnInit {
  subData: Array<any> | undefined;
  constructor(private subsrcibersServices: SubsrcibersService) {}
  ngOnInit(): void {
    this.subsrcibersServices.loadSub().subscribe((subs) => {
      this.subData = subs;
    });
  }

  handleDeleteSub(id: string) {
    this.subsrcibersServices.deleteSub(id);
  }
}
