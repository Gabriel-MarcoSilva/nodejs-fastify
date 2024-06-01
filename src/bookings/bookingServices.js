//funções

const Booking = require("./booking")

class BookingSevice {
    
    constructor (repository) { //cria um unico repositório
        this.repository = repository
    }
    
    findAllBookings () { //lista todas as reservas
        return this.repository.findAll()
    }

    createBooking ({user, roomId, guestName, checkInDate, checkOutDate})  {
        const newBooking = new Booking({user, roomId,guestName, checkInDate, checkOutDate})

        //processo deverificação se tem reserva naquele quarto ou não
        const overlappingBooking = this.repository.findAll().find((booking) => { //vai olhar em cada booking e comparar
            return ( // se a reserva for mesmo numero e o o dia for depois da saída do antigo hóspede,pode fazer a reserva
                booking.roomId === newBooking.roomId && 
                booking.checkInDate < newBooking.checkOutDate &&
                booking.checkOutDate > newBooking.checkInDate
            )
        })

        if (overlappingBooking) {
            throw new Error ('The room is ocuped')
        }
        
        this.repository.create(newBooking)
        return newBooking
    }
}

module.exports = BookingSevice