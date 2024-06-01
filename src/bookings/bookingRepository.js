//salvar os dados, mas será transferido para o banco de dados

class BookingRepository {
    constructor () {
        this.bookings = []
    }

    findAll() {
        return this.bookings //no postgress setar para a tabela
    }

    create (booking) {
        // cria reserva
        this.bookings.push(booking)
    }
}

module.exports = BookingRepository