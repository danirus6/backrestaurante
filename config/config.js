// solicitamos acceso a la variable de entorno
process.loadEnvFile()
const mongoose = require('mongoose')

const MONGOURI = process.env.MONGO_URI

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGOURI)
    console.log('Base de datos conectada con éxito')
  } catch (error) {
    console.error(error)
    throw new Error('Error a la hora de iniciar la base de datos')
  }
}

module.exports = {
  dbConnection,
}
