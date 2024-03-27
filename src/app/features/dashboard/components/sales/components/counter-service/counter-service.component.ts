import { Component, OnInit } from '@angular/core';
import { OpenServiceComponent } from './open-service/open-service.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-counter-service',
  templateUrl: './counter-service.component.html',
  styleUrls: ['./counter-service.component.scss']
})
export class CounterServiceComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openService(): void {
    const dialogRef = this.dialog.open(OpenServiceComponent, {
      width: '1200px',
      height: ' 700px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
