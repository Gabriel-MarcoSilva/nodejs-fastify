// entidade responsável por manipular e gerenciar as rotas do sistema

class BookingController {
    constructor(service) {
        this.service = service
    }

    index (request) {
        //pega todas as reservas
        const bookings = this.service.findAllBookings()
        return {code: 200, body: { bookings }}
    }

    cadBooking (request) {
        const { roomId, guestName, checkInDate, checkOutDate } = request.body
        const user = request.user
        console.log(user)

        if (!roomId || !guestName || !checkInDate || !checkOutDate) {
            return {code: 400, body: {message: "All fields are required"}}
        }
        const booking = this.service.createBooking({ user, roomId, guestName, checkInDate, checkOutDate })

        return { code: 201, body: {message: 'Booking created successfully', booking}}
    }
}

module.exports = BookingController