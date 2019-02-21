import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Router, NavigationEnd } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public router: Router) {

    angulartics2GoogleAnalytics.startTracking();

  }

}
