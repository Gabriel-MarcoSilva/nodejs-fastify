const AuthService = require('./auth/authServices')
const AuthController = require('./auth/authController')
const UserRepository = require('./auth/userRepository')
const BookingSevice = require('./bookings/bookingServices')
const BookingController = require('./bookings/bookingController')
const BookingRepository = require('./bookings/bookingRepository')

const bookingRepository = new BookingRepository()
const bookingService = new BookingSevice(bookingRepository)
const bookingController = new BookingController(bookingService)
const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)

module.exports = {
    bookingController,
    authController,
    authService
}