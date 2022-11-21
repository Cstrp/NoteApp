import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Note} from '../../models/note';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  @Output() addNote: EventEmitter<Note> = new EventEmitter<Note>();

  public text: string = '';

  public edit: boolean = false;

  public form: FormGroup = new FormGroup({
    text: new FormControl(''),
    completed: new FormControl(false),
    tag: new FormControl(''),
  });

  get control(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', [Validators.required]],
      completed: [false],
      tag: ['', [Validators.required, Validators.pattern(/^#\w+$/gm)]],
    });
  }

  saveNote() {
    this.addNote.emit(this.form.value);
  }
}
