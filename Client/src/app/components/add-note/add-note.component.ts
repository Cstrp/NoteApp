import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Note} from '../../models/note';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServerService} from '../../services/server.service';

type GenerateId = () => string;
export const generateId: GenerateId = () => Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  @Output() addNote: EventEmitter<Note> = new EventEmitter<Note>();

  @Output() updNote: EventEmitter<Note> = new EventEmitter<Note>();

  public edit: boolean = false;

  public form: FormGroup = new FormGroup({
    text: new FormControl(''),
    completed: new FormControl(false),
    tag: new FormControl(''),
  });

  get control(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder, public server: ServerService) {
    this.server.edit = this.edit;
  }

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

  updateNote() {
    this.server.edit = true;
    this.updNote.emit(this.form.value);
  }
}
