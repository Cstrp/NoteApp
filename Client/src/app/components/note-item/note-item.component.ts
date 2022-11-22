import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../../models/note';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() note: Note = {} as Note;

  @Output() removeNote: EventEmitter<Note> = new EventEmitter<Note>();

  @Output() updateNote: EventEmitter<Note> = new EventEmitter<Note>();

  constructor(private server: ServerService) {}

  ngOnInit(): void {}

  complete(note: Note) {
    note.completed = !note.completed;
    this.server.completeNote(note).subscribe();

    if (note.completed) {
      this.server.openSnackBar('Item Done!', 'Dismiss');
    } else {
      this.server.openSnackBar('Item Not Done!', 'Dismiss');
    }
  }

  updNote(note: Note) {
    console.log(note);
    this.server.updateNote(note).subscribe();
  }

  rmNote(note: Note) {
    this.removeNote.emit(this.note);
  }
}
