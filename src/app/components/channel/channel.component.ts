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
    description: ['']
  });
  isFormVisible: boolean = false;

  constructor(private channelService: ChannelService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.channelForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadChannels();
  }

  onSubmit(): void {
    const channelData = this.channelForm.value;
    this.channelService.addChannel(channelData).subscribe({
      next: response => {
        this.successMessage = "Channel added successfully!";
        this.errorMessage = null;
        this.loadChannels();
      },
      error: error => {
        this.errorMessage = "Failed to add channel. Please try again.";
        this.successMessage = null;
      }
    });
  }  

  loadChannels(): void {
    this.channelService.getAllChannels().subscribe(data => {
      this.channels = data;
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
    this.channelService.updateChannel(this.channel).subscribe(() => {
      this.successMessage = "Channel updated successfully!";
      this.errorMessage = null;
      this.loadChannels();
    },
    error => {
      this.errorMessage = "Failed to update channel. Please try again.";
      this.successMessage = null;
    });
  }  

  deleteChannel(id: number): void {
    this.channelService.deleteChannel(id).subscribe(() => {
      this.successMessage = "Channel deleted successfully!";
      this.errorMessage = null;
      this.loadChannels();
    },
    error => {
      this.errorMessage = "Failed to delete channel. Please try again.";
      this.successMessage = null;
    });
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }  
}

