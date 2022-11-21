import {Component, OnInit} from '@angular/core';
import {Note} from '../../models/note';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  public notes: Note[] = [];

  constructor(public server: ServerService) {}

  ngOnInit(): void {
    this.server.load().subscribe((notes) => (this.notes = notes));
  }

  public addNote(note: Note) {
    this.server.addNote(note).subscribe((notes) => this.notes.push(note));
  }

  public removeNote(note: Note) {
    this.notes = this.notes.filter((i) => i.id !== note.id);
    this.server.removeNote(note).subscribe();
  }

  public filterValue(evt: Event) {
    if (evt.target instanceof HTMLInputElement) {
      this.server.inputValue = evt.target.value;
    }
  }

  public getFilterByInputValue() {
    return this.server.inputValue;
  }
}
