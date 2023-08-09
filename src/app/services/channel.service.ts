import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Channel } from '../models/channel.model';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private apiUrl: string;
  
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${configService.getApiUrl()}/channels`;
  }
  
  getAllChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }

  getChannelById(id: number): Observable<Channel> {
    return this.http.get<Channel>(`${this.apiUrl}/${id}`);
  }

  addChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(this.apiUrl, channel);
  }

  updateChannel(channel: Channel): Observable<Channel> {
    return this.http.put<Channel>(`${this.apiUrl}/${channel.id}`, channel);
  }

  deleteChannel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

