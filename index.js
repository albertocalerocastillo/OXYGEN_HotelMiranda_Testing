class Room {
    constructor(name, bookings = [], rate, discount) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
    }
  
    isOccupied(date) {
      return false;

    }
  
    occupancyPercentage(startDate, endDate) {

      return 0;
    }
  
    static totalOccupancyPercentage(rooms, startDate, endDate) {

      return 0;
    }
  
    static availableRooms(rooms, startDate, endDate) {

        return [];
    }
  }
  
  class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
      this.name = name;
      this.email = email;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
      this.room = room;
    }
  
    get fee() {

        return 0;
    }
  }
  
module.exports = { Room, Booking };  