import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Note} from '../models/note';
import {HttpClient} from '@angular/common/http';
import {headers} from '../const/_headers';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private url: string = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  load(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.url}`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.url, note, {headers: headers});
  }

  completeNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.url + `/${note.id}`, note, {headers: headers}).pipe(
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  removeNote(note: Note): Observable<Note> {
    return this.http.delete<Note>(this.url + `/${note.id}`, {headers: headers});
  }
}
