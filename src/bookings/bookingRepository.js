//salvar os dados, mas será transferido para o banco de dados

const db = require('../database')
const Booking = require('./booking')

class BookingRepository {
    constructor() {
        this.db = db
    }

    async findAll() {
        // return this.bookings //no postgress setar para a tabela
        const storedBookings = await this.db.manyOrNone('SELECT id, room_id AS "roomId", guest_name AS "guestName", check_in_date AS "checkInDate", check_out_date AS "checkOutDate",user_id AS "userId" FROM Bookings')
        return storedBookings.map(booking => new Booking(booking))
    }

    async create(booking) {
        // cria reserva
        // this.bookings.push(booking)
        await this.db.none('INSERT INTO Bookings (id, room_id, guest_name, check_in_date, check_out_date, user_id) VALUES (${id}, ${roomId}, ${guestName}, ${checkInDate}, ${checkOutDate}, ${userId})', booking)
    }
}

module.exports = BookingRepository