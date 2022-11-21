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

  constructor(private server: ServerService) {}

  ngOnInit(): void {
    this.server.load().subscribe((notes) => (this.notes = notes));
  }

  addNote(note: Note) {
    this.server.addNote(note).subscribe((notes) => this.notes.push(note));
  }

  removeNote(note: Note) {
    this.notes = this.notes.filter((i) => i.id !== note.id);
    this.server.removeNote(note).subscribe();
  }
}
