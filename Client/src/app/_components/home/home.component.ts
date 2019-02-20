import { AgeDialogComponent } from './../dialogs/age-dialog/age-dialog.component';
import { ConfirmationDialogComponent } from './../dialogs/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import 'hammerjs';

export interface Flavours {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  emailForm: FormGroup;

  flavours: Flavours[] = [
    {value: 'Thai', viewValue: 'THAI COCONUT'},
    {value: 'Jalepeno', viewValue: 'MEXICAN JALEPENO'},
    {value: 'Toffee', viewValue: 'ENGLISH TOFFEE'},
    {value: 'NotReady', viewValue: 'NOT READY YET'},
  ];

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog) {
      this.dialog.open(AgeDialogComponent, {disableClose: true});
  }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      flavour: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email])
    });
  }

  ngOnDestroy() {

  }

  register() {
    let dRef: MatDialogRef<ConfirmationDialogComponent>;
    dRef = this.dialog.open(ConfirmationDialogComponent);
    return dRef.afterClosed().subscribe(() => {
      console.log('hello!');
    });
  }

}
