import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter-notes',
  templateUrl: './filter-notes.component.html',
  styleUrls: ['./filter-notes.component.scss'],
})
export class FilterNotesComponent {
  @Output() inputValue = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
