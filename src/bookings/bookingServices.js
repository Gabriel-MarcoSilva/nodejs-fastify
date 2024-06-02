//funções

const Booking = require("./booking")

class BookingSevice {

    constructor(repository) { //cria um unico repositório
        this.repository = repository
    }

    async findAllBookings() { //lista todas as reservas
        return await this.repository.findAll()
    }

    async createBooking({ userId, roomId, guestName, checkInDate, checkOutDate }) {
        const newBooking = new Booking({ userId, roomId, guestName, checkInDate, checkOutDate })

        //processo deverificação se tem reserva naquele quarto ou 
        const allBookings = await this.repository.findAll()
        const overlappingBooking = allBookings.find((booking) => { //vai olhar em cada booking e comparar
            return ( // se a reserva for mesmo numero e o o dia for depois da saída do antigo hóspede,pode fazer a reserva
                booking.roomId === newBooking.roomId &&
                booking.checkInDate < newBooking.checkOutDate &&
                booking.checkOutDate > newBooking.checkInDate
            )
        })

        if (overlappingBooking) {
            throw new Error('The room is ocuped')
        }

        await this.repository.create(newBooking)
        return newBooking
    }
}

module.exports = BookingSevice