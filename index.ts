class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(name: string, bookings: Booking[] = [], rate: number, discount: number) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date: Date): boolean {
    return this.bookings.some(booking => 
      date >= booking.checkIn && date < booking.checkOut
    );
  }

  occupancyPercentage(startDate: Date, endDate: Date): number {
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const occupiedDays = this.bookings.reduce((acc, booking) => {
      const checkIn = Math.max(startDate.getTime(), booking.checkIn.getTime());
      const checkOut = Math.min(endDate.getTime(), booking.checkOut.getTime());
      const daysOccupied = (checkOut - checkIn) / (1000 * 60 * 60 * 24) + 1;
      return acc + (daysOccupied > 0 ? daysOccupied : 0);
    }, 0);
    return (occupiedDays / totalDays) * 100;
  }

  static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number {
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const occupiedDays = rooms.reduce((acc, room) => {
      return acc + room.bookings.reduce((innerAcc, booking) => {
        const checkIn = Math.max(startDate.getTime(), booking.checkIn.getTime());
        const checkOut = Math.min(endDate.getTime(), booking.checkOut.getTime());
        const daysOccupied = (checkOut - checkIn) / (1000 * 60 * 60 * 24) + 1;
        return innerAcc + (daysOccupied > 0 ? daysOccupied : 0);
      }, 0);
    }, 0);
    return (occupiedDays / (totalDays * rooms.length)) * 100;
  }

  static availableRooms(rooms: Room[], startDate: Date, endDate: Date): Room[] {
    return rooms.filter(room => 
      !room.bookings.some(booking =>
        (booking.checkIn >= startDate && booking.checkIn < endDate) ||
        (booking.checkOut > startDate && booking.checkOut <= endDate) ||
        (booking.checkIn <= startDate && booking.checkOut >= endDate)
      )
    );
  }
}

class Booking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: Room;

  constructor(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: Room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  get fee(): number {
    const totalNights = (this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 60 * 60 * 24);
    const roomRate = this.room.rate - (this.room.rate * this.room.discount / 100);
    const discountedRate = roomRate - (roomRate * this.discount / 100);
    return Math.round(discountedRate * totalNights);
  }
}

export { Room, Booking };