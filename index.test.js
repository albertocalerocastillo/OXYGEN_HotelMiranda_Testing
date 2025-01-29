const { Room, Booking } = require('./index');

describe('Clase Room', () => {
  test('debería crear una instancia de Room', () => {
    const room = new Room('Habitación Deluxe', [], 10000, 10);
    expect(room.name).toBe('Habitación Deluxe');
    expect(room.bookings).toEqual([]);
    expect(room.rate).toBe(10000);
    expect(room.discount).toBe(10);
  });

  test('debería devolver falso si la habitación no está ocupada en la fecha dada', () => {
    const room = new Room('Habitación Deluxe', [], 10000, 10);
    const date = new Date('2025-01-01');
    expect(room.isOccupied(date)).toBe(false);
  });

  test('debería devolver verdadero si la habitación está ocupada en la fecha dada', () => {
    const room = new Room('Habitación Deluxe', [new Booking('Alberto', 'alberto@example.com', new Date('2025-01-01'), new Date('2025-01-10'), 0, {})], 10000, 10);
    const date = new Date('2025-01-05');
    expect(room.isOccupied(date)).toBe(true);
  });

  test('debería devolver 0% de ocupación si no hay reservas presentes', () => {
    const room = new Room('Habitación Deluxe', [], 10000, 10);
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    expect(room.occupancyPercentage(startDate, endDate)).toBe(0);
  });

  test('debería devolver 100% de ocupación si hay reservas que cubren todas las fechas', () => {
    const room = new Room('Habitación Deluxe', [new Booking('Alberto', 'alberto@example.com', new Date('2025-01-01'), new Date('2025-01-10'), 0, {})], 10000, 10);
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    expect(room.occupancyPercentage(startDate, endDate)).toBe(100);
  });

  test('debería devolver un valor intermedio de ocupación si hay reservas parciales', () => {
    const room = new Room('Habitación Deluxe', [new Booking('Alberto', 'alberto@example.com', new Date('2025-01-02'), new Date('2025-01-05'), 0, {})], 10000, 10);
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    expect(room.occupancyPercentage(startDate, endDate)).toBeCloseTo(40, 1);
  });

  test('debería calcular el porcentaje de ocupación total de varias habitaciones', () => {
    const rooms = [
      new Room('Habitación 1', [], 10000, 10),
      new Room('Habitación 2', [], 12000, 15)
    ];
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(0);
  });

  test('debería devolver las habitaciones disponibles para el rango de fechas dado', () => {
    const rooms = [
      new Room('Habitación 1', [], 10000, 10),
      new Room('Habitación 2', [], 12000, 15)
    ];
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    expect(Room.availableRooms(rooms, startDate, endDate)).toEqual(rooms);
  });

  test('debería devolver las habitaciones no disponibles para el rango de fechas dado', () => {
    const rooms = [
      new Room('Habitación 1', [new Booking('Alberto', 'alberto@example.com', new Date('2025-01-01'), new Date('2025-01-10'), 0, {})], 10000, 10),
      new Room('Habitación 2', [], 12000, 15)
    ];
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    expect(Room.availableRooms(rooms, startDate, endDate)).toEqual([rooms[1]]);
  });
});

describe('Clase Booking', () => {
  test('debería crear una instancia de Booking', () => {
    const room = new Room('Habitación Deluxe', [], 10000, 10);
    const booking = new Booking('Alberto Calero', 'alberto@example.com', new Date('2025-01-01'), new Date('2025-01-05'), 5, room);
    expect(booking.name).toBe('Alberto Calero');
    expect(booking.email).toBe('alberto@example.com');
    expect(booking.checkIn).toEqual(new Date('2025-01-01'));
    expect(booking.checkOut).toEqual(new Date('2025-01-05'));
    expect(booking.discount).toBe(5);
    expect(booking.room).toBe(room);
  });

  test('debería devolver la tarifa de la reserva', () => {
    const room = new Room('Habitación Deluxe', [], 10000, 10);
    const booking = new Booking('Alberto Calero', 'alberto@example.com', new Date('2025-01-01'), new Date('2025-01-05'), 5, room);
    const expectedFee = 10000 * 0.9 * 0.95 * 4;
    expect(booking.fee).toBe(expectedFee);
  });
});