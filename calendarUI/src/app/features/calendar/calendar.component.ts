import { Component, computed, signal, output } from '@angular/core';
import { startOfToday, format } from 'date-fns';
import { months } from './calendar-constants';
import { images } from '../../../assets/assetPath';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  forwardIcon = images.forwardArrow;
  backwardIcon = images.backArrow;
  months = months;
  today = signal(startOfToday());
  currentMonth = computed(() => {
    return format(this.today(), 'MMM');
  })
  selected = signal<any>(null);
  currentYear = signal(format(this.today(), 'yyyy'));
  selectedDates = output<any>();
  nextYear = signal((parseInt(this.currentYear()) + 1).toString());

  selectPrevYear() {
    this.currentYear.update(year => (parseInt(year) - 1).toString());
    this.nextYear.update(year => (parseInt(year) - 1).toString());
  }

  selectNextYear() {
    this.currentYear.update(year => (parseInt(year) + 1).toString());
    this.nextYear.update(year => (parseInt(year) + 1).toString());
  }

  selectMonth(month: any, year: string) {
    const toDate = this.toDate(month.id, year);
    const fromDate = this.fromDate(month.id, year);

    this.selected.set({ toDate: toDate, fromDate: fromDate });
    this.selectedDates.emit({ toDate: toDate, fromDate: fromDate });
  }

  isSelected(month: any, year: string) {
    const toDate = this.toDate(month.id, year);
    const fromDate = this.fromDate(month.id, year);

    if (this.selected() && this.selected().toDate === toDate && this.selected().fromDate === fromDate) {
      return true;
    } else {
      return false;
    }
  }

  toDate(month: number, year: string) {
    return format(new Date(`${month}/01/${year}`), 'yyyy-MM-dd');
  }

  fromDate(month: number, year: string) {
    const lastDayOfTheMonth = new Date(parseInt(year), month, 0).getDate();
    return format(new Date(`${month}/${lastDayOfTheMonth}/${year}`), 'yyyy-MM-dd');
  }
}
