import { Component, OnInit, OnDestroy } from '@angular/core';
import 'hammerjs';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-nocontest',
  templateUrl: './nocontest.component.html',
  styleUrls: ['./nocontest.component.scss']
})

export class NocontestComponent implements OnInit, OnDestroy {

  constructor(public angulartics2: Angulartics2) {

  }

  ngOnInit() {
    if (this.angulartics2) {
      this.angulartics2.eventTrack.next({
        action: 'page-view-not-eligible'
      });
      // console.log(this.angulartics2);
    }
  }

  ngOnDestroy() {

  }

}
