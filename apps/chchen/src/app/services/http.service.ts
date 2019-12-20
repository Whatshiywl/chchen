import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchInterface } from '@chchen/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  backendURL = 'http://localhost:3333/api';

  constructor(
    private http: HttpClient,
  ) { }

  createMatch (white: string, black: string) {
    const url = this.backendURL + `/match/${white}/${black}`;
    return this.http.put<MatchInterface>(url, {})
  }

  getMatch (id: string) {
    const url = this.backendURL + `/match/${id}`;
    return this.http.get(url, {})
  }

  move (id: string, from: string, to: string) {
    const url = this.backendURL + `/match/${id}/move/${from}/${to}`;
    return this.http.post<MatchInterface>(url, {});
  }
}
