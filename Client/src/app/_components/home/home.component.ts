import { AgeDialogComponent } from './../dialogs/age-dialog/age-dialog.component';
import { ConfirmationDialogComponent } from './../dialogs/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Angulartics2 } from 'angulartics2';
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
    private angulartics2: Angulartics2,
    private dialog: MatDialog) {
      this.dialog.open(AgeDialogComponent, {disableClose: true});
  }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      flavour: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email])
    });
    if (this.angulartics2) {
      this.angulartics2.eventTrack.next({
        action: 'page-view-home'
      });
      // console.log(this.angulartics2);
    }
  }

  ngOnDestroy() {

  }

  selectFlavour(event) {
    if (this.angulartics2) {
      this.angulartics2.eventTrack.next({
        action: 'flavour-vote-' + event.value
      });
      // console.log(this.angulartics2);
    }
  }

  register() {
    if (this.angulartics2) {
      this.angulartics2.eventTrack.next({
        action: 'email-submit-' + this.emailForm.controls.email.value
      });
      // console.log(this.angulartics2);
    }
    let dRef: MatDialogRef<ConfirmationDialogComponent>;
    dRef = this.dialog.open(ConfirmationDialogComponent);
    return dRef.afterClosed().subscribe(() => {
      // console.log('hello!');
    });
  }

}
