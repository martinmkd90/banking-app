import { Component, OnInit } from '@angular/core';
import { SegmentService } from '../../services/segment.service';
import { Segment } from '../../models/segment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent implements OnInit {
  segments: Segment[] = [];
  segment: Segment = new Segment();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  segmentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private segmentService: SegmentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadSegments();
  }

  loadSegments(): void {
    this.segmentService.getAllSegments().subscribe(data => {
      this.segments = data;
    });
  }

  getSegmentById(id: number): Segment {
    return this.segments.find(p => p.id === id) || new Segment();
  }

  addSegment(): void {
    this.segmentService.addSegment(this.segment).subscribe(data => {
      this.loadSegments();
    });
  }

  updateSegment(): void {
    this.segmentService.updateSegment(this.segment).subscribe(data => {
      this.loadSegments();
    });
  }

  deleteSegment(id: number): void {
    this.segmentService.deleteSegment(id).subscribe(() => {
      this.loadSegments();
    });
  }  
}

