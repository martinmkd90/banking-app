import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../models/channel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channels: Channel[] = [];
  channel: Channel = new Channel();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  channelForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private channelService: ChannelService, private fb: FormBuilder) {
    this.channelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadChannels();
  }

  onSubmit(): void {
    if (this.channelForm.valid) {
      const channelData = this.channelForm.value;
      this.channelService.addChannel(channelData).subscribe({
        next: data => {
          this.successMessage = 'Channel added successfully!';
        },
        error: error => {
          this.errorMessage = 'Failed to add channel. Please try again later.';
        }
      });
    }
  }

  loadChannels(): void {
    this.channelService.getAllChannels().subscribe({
      next: data => {
        this.channels = data;
        this.successMessage = 'Channels loaded successfully!';
      },
      error: error => {
        this.errorMessage = 'Failed to load channels. Please try again later.';
      }
  });
  }

  getChannelById(id: number): Channel {
    return this.channels.find(p => p.id === id) || new Channel();
  }

  addChannel(): void {
    this.channelService.addChannel(this.channel).subscribe(data => {
      this.loadChannels();
    });
  }

  updateChannel(): void {
    this.channelService.updateChannel(this.channel).subscribe(data => {
      this.loadChannels();
    });
  }

  deleteChannel(id: number): void {
    this.channelService.deleteChannel(id).subscribe(() => {
      this.loadChannels();
    });
  }  
}

