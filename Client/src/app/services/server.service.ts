import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Note} from '../models/note';
import {HttpClient} from '@angular/common/http';
import {headers} from '../const/_headers';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private url: string = 'http://localhost:3000/notes';

  public inputValue: string = '';

  public inputEditValue: Note = {
    tag: '',
    text: '',
  };

  public edit: boolean = false;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {}

  public load(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.url}`).pipe(catchError((err) => throwError(err)));
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.url, note, {headers: headers}).pipe(catchError((err) => throwError(err)));
  }

  public completeNote(note: Note): Observable<Note> {
    return this.http
      .put<Note>(this.url + `/${note.id}`, note, {headers: headers})
      .pipe(catchError((err) => throwError(err)));
  }

  public updateNote(note: Note): Observable<Note> {
    this.edit = true;
    this.inputEditValue = {
      text: note.text,
      tag: note.tag,
    };

    return this.http
      .put<Note>(this.url + `/${note.id}`, this.inputEditValue, {headers: headers})
      .pipe(catchError((err) => throwError(err)));
  }

  public removeNote(note: Note): Observable<Note> {
    return this.http
      .delete<Note>(this.url + `/${note.id}`, {headers: headers})
      .pipe(catchError((err) => throwError(err)));
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
