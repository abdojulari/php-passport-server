import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'hammerjs';

export interface Month {
  value: number;
  viewValue: string;
}

export interface Day {
  value: number;
  viewValue: string;
}

export interface Year {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-age-dialog',
  templateUrl: 'age-dialog.component.html',
  styleUrls: ['age-dialog.component.scss']
})

export class AgeDialogComponent implements OnInit, OnDestroy {

  months: Month[] = [
    {value: 1, viewValue: '01'},
    {value: 2, viewValue: '02'},
    {value: 3, viewValue: '03'},
    {value: 4, viewValue: '04'},
    {value: 5, viewValue: '05'},
    {value: 6, viewValue: '06'},
    {value: 7, viewValue: '07'},
    {value: 8, viewValue: '08'},
    {value: 9, viewValue: '09'},
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11'},
    {value: 12, viewValue: '12'},
  ];

  days: Day[] = [
    {value: 1, viewValue: '01'},
    {value: 2, viewValue: '02'},
    {value: 3, viewValue: '03'},
    {value: 4, viewValue: '04'},
    {value: 5, viewValue: '05'},
    {value: 6, viewValue: '06'},
    {value: 7, viewValue: '07'},
    {value: 8, viewValue: '08'},
    {value: 9, viewValue: '09'},
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11'},
    {value: 12, viewValue: '12'},
    {value: 13, viewValue: '13'},
    {value: 14, viewValue: '14'},
    {value: 15, viewValue: '15'},
    {value: 16, viewValue: '16'},
    {value: 17, viewValue: '17'},
    {value: 18, viewValue: '18'},
    {value: 19, viewValue: '19'},
    {value: 20, viewValue: '20'},
    {value: 21, viewValue: '21'},
    {value: 22, viewValue: '22'},
    {value: 23, viewValue: '23'},
    {value: 24, viewValue: '24'},
    {value: 25, viewValue: '25'},
    {value: 26, viewValue: '26'},
    {value: 27, viewValue: '27'},
    {value: 28, viewValue: '28'},
    {value: 29, viewValue: '29'},
    {value: 30, viewValue: '30'},
    {value: 31, viewValue: '31'},
  ];

  years: Year[] = [
    {value: 2019, viewValue: '2019'},
    {value: 2018, viewValue: '2018'},
    {value: 2017, viewValue: '2017'},
    {value: 2016, viewValue: '2016'},
    {value: 2015, viewValue: '2015'},
    {value: 2014, viewValue: '2014'},
    {value: 2013, viewValue: '2013'},
    {value: 2012, viewValue: '2012'},
    {value: 2011, viewValue: '2011'},
    {value: 2010, viewValue: '2010'},
    {value: 2009, viewValue: '2009'},
    {value: 2008, viewValue: '2008'},
    {value: 2007, viewValue: '2007'},
    {value: 2006, viewValue: '2006'},
    {value: 2005, viewValue: '2005'},
    {value: 2004, viewValue: '2004'},
    {value: 2003, viewValue: '2003'},
    {value: 2002, viewValue: '2002'},
    {value: 2001, viewValue: '2001'},
    {value: 2000, viewValue: '2000'},
    {value: 1999, viewValue: '1999'},
    {value: 1998, viewValue: '1998'},
    {value: 1997, viewValue: '1997'},
    {value: 1996, viewValue: '1996'},
    {value: 1995, viewValue: '1995'},
    {value: 1994, viewValue: '1994'},
    {value: 1993, viewValue: '1993'},
    {value: 1992, viewValue: '1992'},
    {value: 1991, viewValue: '1991'},
    {value: 1990, viewValue: '1990'},
    {value: 1989, viewValue: '1989'},
    {value: 1988, viewValue: '1988'},
    {value: 1987, viewValue: '1987'},
    {value: 1986, viewValue: '1986'},
    {value: 1985, viewValue: '1985'},
    {value: 1984, viewValue: '1984'},
    {value: 1983, viewValue: '1983'},
    {value: 1982, viewValue: '1982'},
    {value: 1981, viewValue: '1981'},
    {value: 1980, viewValue: '1980'},
    {value: 1979, viewValue: '1979'},
    {value: 1978, viewValue: '1978'},
    {value: 1977, viewValue: '1977'},
    {value: 1976, viewValue: '1976'},
    {value: 1975, viewValue: '1975'},
    {value: 1974, viewValue: '1974'},
    {value: 1973, viewValue: '1973'},
    {value: 1972, viewValue: '1972'},
    {value: 1971, viewValue: '1971'},
    {value: 1970, viewValue: '1970'},
    {value: 1969, viewValue: '1969'},
    {value: 1968, viewValue: '1968'},
    {value: 1967, viewValue: '1967'},
    {value: 1966, viewValue: '1966'},
    {value: 1965, viewValue: '1965'},
    {value: 1964, viewValue: '1964'},
    {value: 1963, viewValue: '1963'},
    {value: 1962, viewValue: '1962'},
    {value: 1961, viewValue: '1961'},
    {value: 1960, viewValue: '1960'},
    {value: 1959, viewValue: '1959'},
    {value: 1958, viewValue: '1958'},
    {value: 1957, viewValue: '1957'},
    {value: 1956, viewValue: '1956'},
    {value: 1955, viewValue: '1955'},
    {value: 1954, viewValue: '1954'},
    {value: 1953, viewValue: '1953'},
    {value: 1952, viewValue: '1952'},
    {value: 1951, viewValue: '1951'},
    {value: 1950, viewValue: '1950'},
    {value: 1949, viewValue: '1949'},
    {value: 1948, viewValue: '1948'},
    {value: 1947, viewValue: '1947'},
    {value: 1946, viewValue: '1946'},
    {value: 1945, viewValue: '1945'},
    {value: 1944, viewValue: '1944'},
    {value: 1943, viewValue: '1943'},
    {value: 1942, viewValue: '1942'},
    {value: 1941, viewValue: '1941'},
    {value: 1940, viewValue: '1940'},
    {value: 1939, viewValue: '1939'},
    {value: 1938, viewValue: '1938'},
    {value: 1937, viewValue: '1937'},
    {value: 1936, viewValue: '1936'},
    {value: 1935, viewValue: '1935'},
    {value: 1934, viewValue: '1934'},
    {value: 1933, viewValue: '1933'},
    {value: 1932, viewValue: '1932'},
    {value: 1931, viewValue: '1931'},
    {value: 1930, viewValue: '1930'},
    {value: 1929, viewValue: '1929'},
    {value: 1928, viewValue: '1928'},
    {value: 1927, viewValue: '1927'},
    {value: 1926, viewValue: '1926'},
    {value: 1925, viewValue: '1925'},
    {value: 1924, viewValue: '1924'},
    {value: 1923, viewValue: '1923'},
    {value: 1922, viewValue: '1922'},
    {value: 1921, viewValue: '1921'},
    {value: 1920, viewValue: '1920'},
    {value: 1919, viewValue: '1919'},
  ];

  ageForm: FormGroup;
  agePassed: boolean;

  constructor(public dialogRef: MatDialogRef<AgeDialogComponent>,
              public formBuilder: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
    this.ageForm = this.formBuilder.group({
      month: this.formBuilder.control(null, [Validators.required]),
      day: this.formBuilder.control(null, [Validators.required]),
      year: this.formBuilder.control(null, [Validators.required])
    });
    this.agePassed = false;
  }

  ngOnDestroy() {

  }

  selectMonth(event) {
    if (event.value === 1 || event.value === 3 || event.value === 5 || event.value === 7 ||
      event.value === 8 || event.value === 10 || event.value === 12) {
        this.days = [
          {value: 1, viewValue: '01'},
          {value: 2, viewValue: '02'},
          {value: 3, viewValue: '03'},
          {value: 4, viewValue: '04'},
          {value: 5, viewValue: '05'},
          {value: 6, viewValue: '06'},
          {value: 7, viewValue: '07'},
          {value: 8, viewValue: '08'},
          {value: 9, viewValue: '09'},
          {value: 10, viewValue: '10'},
          {value: 11, viewValue: '11'},
          {value: 12, viewValue: '12'},
          {value: 13, viewValue: '13'},
          {value: 14, viewValue: '14'},
          {value: 15, viewValue: '15'},
          {value: 16, viewValue: '16'},
          {value: 17, viewValue: '17'},
          {value: 18, viewValue: '18'},
          {value: 19, viewValue: '19'},
          {value: 20, viewValue: '20'},
          {value: 21, viewValue: '21'},
          {value: 22, viewValue: '22'},
          {value: 23, viewValue: '23'},
          {value: 24, viewValue: '24'},
          {value: 25, viewValue: '25'},
          {value: 26, viewValue: '26'},
          {value: 27, viewValue: '27'},
          {value: 28, viewValue: '28'},
          {value: 29, viewValue: '29'},
          {value: 30, viewValue: '30'},
          {value: 31, viewValue: '31'},
        ] as Day[];
    } else if (event.value === 4 || event.value === 6 || event.value === 9 || event.value === 11) {
      this.days = [
        {value: 1, viewValue: '01'},
        {value: 2, viewValue: '02'},
        {value: 3, viewValue: '03'},
        {value: 4, viewValue: '04'},
        {value: 5, viewValue: '05'},
        {value: 6, viewValue: '06'},
        {value: 7, viewValue: '07'},
        {value: 8, viewValue: '08'},
        {value: 9, viewValue: '09'},
        {value: 10, viewValue: '10'},
        {value: 11, viewValue: '11'},
        {value: 12, viewValue: '12'},
        {value: 13, viewValue: '13'},
        {value: 14, viewValue: '14'},
        {value: 15, viewValue: '15'},
        {value: 16, viewValue: '16'},
        {value: 17, viewValue: '17'},
        {value: 18, viewValue: '18'},
        {value: 19, viewValue: '19'},
        {value: 20, viewValue: '20'},
        {value: 21, viewValue: '21'},
        {value: 22, viewValue: '22'},
        {value: 23, viewValue: '23'},
        {value: 24, viewValue: '24'},
        {value: 25, viewValue: '25'},
        {value: 26, viewValue: '26'},
        {value: 27, viewValue: '27'},
        {value: 28, viewValue: '28'},
        {value: 29, viewValue: '29'},
        {value: 30, viewValue: '30'},
      ] as Day[];
    } else {
      this.days = [
        {value: 1, viewValue: '01'},
        {value: 2, viewValue: '02'},
        {value: 3, viewValue: '03'},
        {value: 4, viewValue: '04'},
        {value: 5, viewValue: '05'},
        {value: 6, viewValue: '06'},
        {value: 7, viewValue: '07'},
        {value: 8, viewValue: '08'},
        {value: 9, viewValue: '09'},
        {value: 10, viewValue: '10'},
        {value: 11, viewValue: '11'},
        {value: 12, viewValue: '12'},
        {value: 13, viewValue: '13'},
        {value: 14, viewValue: '14'},
        {value: 15, viewValue: '15'},
        {value: 16, viewValue: '16'},
        {value: 17, viewValue: '17'},
        {value: 18, viewValue: '18'},
        {value: 19, viewValue: '19'},
        {value: 20, viewValue: '20'},
        {value: 21, viewValue: '21'},
        {value: 22, viewValue: '22'},
        {value: 23, viewValue: '23'},
        {value: 24, viewValue: '24'},
        {value: 25, viewValue: '25'},
        {value: 26, viewValue: '26'},
        {value: 27, viewValue: '27'},
        {value: 28, viewValue: '28'},
      ] as Day[];
    }
  }

  selectYear(event) {
    if ((event.value % 400 === 0 || event.value % 100 !== 0) && (event.value % 4 === 0)) {
      this.days = [
        {value: 1, viewValue: '01'},
        {value: 2, viewValue: '02'},
        {value: 3, viewValue: '03'},
        {value: 4, viewValue: '04'},
        {value: 5, viewValue: '05'},
        {value: 6, viewValue: '06'},
        {value: 7, viewValue: '07'},
        {value: 8, viewValue: '08'},
        {value: 9, viewValue: '09'},
        {value: 10, viewValue: '10'},
        {value: 11, viewValue: '11'},
        {value: 12, viewValue: '12'},
        {value: 13, viewValue: '13'},
        {value: 14, viewValue: '14'},
        {value: 15, viewValue: '15'},
        {value: 16, viewValue: '16'},
        {value: 17, viewValue: '17'},
        {value: 18, viewValue: '18'},
        {value: 19, viewValue: '19'},
        {value: 20, viewValue: '20'},
        {value: 21, viewValue: '21'},
        {value: 22, viewValue: '22'},
        {value: 23, viewValue: '23'},
        {value: 24, viewValue: '24'},
        {value: 25, viewValue: '25'},
        {value: 26, viewValue: '26'},
        {value: 27, viewValue: '27'},
        {value: 28, viewValue: '28'},
        {value: 29, viewValue: '29'},
      ] as Day[];
    } else {
      this.days = [
        {value: 1, viewValue: '01'},
        {value: 2, viewValue: '02'},
        {value: 3, viewValue: '03'},
        {value: 4, viewValue: '04'},
        {value: 5, viewValue: '05'},
        {value: 6, viewValue: '06'},
        {value: 7, viewValue: '07'},
        {value: 8, viewValue: '08'},
        {value: 9, viewValue: '09'},
        {value: 10, viewValue: '10'},
        {value: 11, viewValue: '11'},
        {value: 12, viewValue: '12'},
        {value: 13, viewValue: '13'},
        {value: 14, viewValue: '14'},
        {value: 15, viewValue: '15'},
        {value: 16, viewValue: '16'},
        {value: 17, viewValue: '17'},
        {value: 18, viewValue: '18'},
        {value: 19, viewValue: '19'},
        {value: 20, viewValue: '20'},
        {value: 21, viewValue: '21'},
        {value: 22, viewValue: '22'},
        {value: 23, viewValue: '23'},
        {value: 24, viewValue: '24'},
        {value: 25, viewValue: '25'},
        {value: 26, viewValue: '26'},
        {value: 27, viewValue: '27'},
        {value: 28, viewValue: '28'},
      ] as Day[];
    }
  }

  processAge() {
    const userDate = new Date(this.ageForm.controls.year.value, this.ageForm.controls.month.value, this.ageForm.controls.day.value);
    const diff_ms = Date.now() - userDate.getTime();
    const age_dt = new Date(diff_ms);
    const userAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    if (userAge >= 13) {
      this.agePassed = true;
    } else {
      this.agePassed = false;
    }
    this.dialogRef.close();
    return this.dialogRef.afterClosed().subscribe(() => {
      if (!this.agePassed) {
        this.router.navigate(['/nocontest']);
      }
    });
  }

}
