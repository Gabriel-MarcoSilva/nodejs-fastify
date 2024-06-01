const { v4 } = require("uuid")

class Booking {
    constructor({id, user, roomId, guestName, checkInDate, checkOutDate}) {
        this.id = id ?? v4()
        this.user = user
        this.roomId = roomId
        this.guestName = guestName
        this.checkInDate = checkInDate
        this.checkOutDate = checkOutDate
    }
}

module.exports = Booking