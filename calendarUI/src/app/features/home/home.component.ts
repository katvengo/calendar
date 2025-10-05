import { Component, computed, signal } from '@angular/core';
import { format, addMonths, eachDayOfInterval, startOfDay, startOfToday} from 'date-fns';
import {months} from './home-constants';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
months = months;
today = signal(startOfToday());
currentMonth = computed(() => {
  return format(this.today(), 'MMM');
})

currentYear = signal(format(this.today(), 'yyyy'));

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
console.log(month);
const toDate = this.toDate(month.id, year);
const fromDate = this.fromDate(month.id, year);

console.log(toDate, fromDate);
}

toDate(month: number, year: string) {
  return format(new Date(`${month}/01/${year}`), 'yyyy-MM-dd');
}
fromDate(month: number, year: string) {
  return format(new Date(`${month}/01/${year}`), 'yyyy-MM-dd');

}

}
