import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  standalone: true,
  imports: [CommonModule] // Ensure CommonModule is imported here
})
export class PopupComponent {
  @Input() showPopup: boolean = false;
  @Input() message: string = '';

  closePopup() {
    this.showPopup = false;
  }
}