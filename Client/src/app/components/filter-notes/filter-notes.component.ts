import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-filter-notes',
  templateUrl: './filter-notes.component.html',
  styleUrls: ['./filter-notes.component.scss'],
})
export class FilterNotesComponent {
  @Output() inputValue = new EventEmitter();

  form: FormGroup = new FormGroup({
    query: new FormControl(''),
  });

  get control(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      query: ['', [Validators.required, Validators.pattern(/^#\\w+$/gm)]],
    });
  }
}
