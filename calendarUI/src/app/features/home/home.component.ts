import { Component, computed, signal } from '@angular/core';
import { format, addMonths, eachDayOfInterval, startOfDay, startOfToday } from 'date-fns';
import { months } from '../calendar/calendar-constants';
import { CalendarComponent } from "../calendar/calendar.component";
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CalendarComponent, CommonModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
toDate = signal<any>(null);
fromDate = signal<any>(null);

datesSelected(event: any) {
  this.toDate.set(event.toDate);
  this.fromDate.set(event.fromDate);
}
}
