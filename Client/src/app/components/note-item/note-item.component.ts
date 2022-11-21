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

  @Output() removeNote: EventEmitter<any> = new EventEmitter<any>();

  constructor(private server: ServerService) {}

  ngOnInit(): void {}

  complete(note: Note) {
    note.completed = !note.completed;
    this.server.completeNote(note).subscribe();
  }

  rmNote(note: Note) {
    this.removeNote.emit(this.note);
  }

  setCompleted() {
    return {
      note: true,
      'id-complete': this.note.completed,
    };
  }
}
