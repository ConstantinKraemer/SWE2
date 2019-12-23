import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Suchkriterien } from 'src/app/buch/shared/buch.service';
import { SucheTitelComponent } from 'src/app/buch/suche-buecher/suchformular/suche-titel.component';

@Component({
  selector: 'hs-suchformular',
  templateUrl: './suchformular.component.html',
  styles: []
})
export class SuchformularComponent implements OnInit {

  @Output()
  readonly suchkriterien = new Subject<Suchkriterien>();

  readonly faInfoCircle = faInfoCircle;
  readonly faSearch = faSearch;

  //@ViewChild(SucheTitelComponent)

  constructor() { }

  ngOnInit() {
  }

}
