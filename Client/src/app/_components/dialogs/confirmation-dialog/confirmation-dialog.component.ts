import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import 'hammerjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrls: ['confirmation-dialog.component.scss']
})

export class ConfirmationDialogComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              public dialog: MatDialog) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
