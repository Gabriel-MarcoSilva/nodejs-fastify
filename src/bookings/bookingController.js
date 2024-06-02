// entidade responsável por manipular e gerenciar as rotas do sistema

class BookingController {
    constructor(service) {
        this.service = service
    }

    async index() {
        //pega todas as reservas
        const bookings = await this.service.findAllBookings()
        return { code: 200, body: { bookings } }
    }

    async cadBooking(request) {
        const { roomId, guestName, checkInDate, checkOutDate } = request.body
        const user = request.user
        console.log(user)

        if (!roomId || !guestName || !checkInDate || !checkOutDate) {
            return { code: 400, body: { message: "All fields are required" } }
        }
        const booking = await this.service.createBooking({ userId: user.id, roomId, guestName, checkInDate, checkOutDate })

        return { code: 201, body: { message: 'Booking created successfully', booking } }
    }
}

module.exports = BookingController