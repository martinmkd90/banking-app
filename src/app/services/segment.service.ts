import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Segment } from '../models/segment.model';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  private apiUrl: string;
  
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${configService.getApiUrl()}/segments`;
  }
  
  getAllSegments(): Observable<Segment[]> {
    return this.http.get<Segment[]>(this.apiUrl);
  }

  getSegmentById(id: number): Observable<Segment> {
    return this.http.get<Segment>(`${this.apiUrl}/${id}`);
  }

  addSegment(segment: Segment): Observable<Segment> {
    return this.http.post<Segment>(this.apiUrl, segment);
  }

  updateSegment(segment: Segment): Observable<Segment> {
    return this.http.put<Segment>(`${this.apiUrl}/${segment.id}`, segment);
  }

  deleteSegment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

