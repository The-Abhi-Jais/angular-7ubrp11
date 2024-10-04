import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seats: any[] = [];
  bookedSeats: number[] = [];

  constructor() {
    this.initializeSeats();
  }

  // Initialize 80 seats, with 7 seats in each row, and 3 in the last row
  initializeSeats() {
    for (let i = 0; i < 11; i++) {
      this.seats.push(
        new Array(7).fill(0).map((_, index) => ({
          number: i * 7 + index + 1,
          available: true,
        }))
      );
    }
    this.seats.push(
      new Array(3).fill(0).map((_, index) => ({
        number: 78 + index + 1,
        available: true,
      }))
    );
  }

  // Function to book seats
  bookSeats(requestedSeats: number) {
    if (requestedSeats < 1 || requestedSeats > 7) {
      alert('You can only book between 1 and 7 seats.');
      return;
    }

    let seatsToBook = [];
    // First try to book in the same row
    for (let row of this.seats) {
      let availableSeats = row.filter((seat) => seat.available).length;
      if (availableSeats >= requestedSeats) {
        seatsToBook = row
          .filter((seat) => seat.available)
          .slice(0, requestedSeats);
        break;
      }
    }

    // If no single row has enough seats, find nearby seats
    if (seatsToBook.length < requestedSeats) {
      for (let row of this.seats) {
        seatsToBook = seatsToBook.concat(row.filter((seat) => seat.available));
        if (seatsToBook.length >= requestedSeats) {
          seatsToBook = seatsToBook.slice(0, requestedSeats);
          break;
        }
      }
    }

    // If seats were found, book them
    if (seatsToBook.length === requestedSeats) {
      seatsToBook.forEach((seat) => (seat.available = false));
      this.bookedSeats = seatsToBook.map((seat) => seat.number);
    } else {
      alert('Not enough seats available.');
    }
  }
}
