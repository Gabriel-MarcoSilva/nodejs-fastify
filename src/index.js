const app = require("./app")

const PORT = process.env.PORT || 3000
const start = async () =>{
    try {
        await app.listen({port: PORT})
        app.log.info(`Server is running on port: ${PORT}`)
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

start()