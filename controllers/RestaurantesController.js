const Restaurantes = require('../models/Restaurantes')
const {
  checkID,
  error500,
  checkData,
  checkEmailDuplicado,
} = require('../middlewares/validations')

const RestaurantesController = {
  async getRestaurantes(req, res) {
    try {
      const restaurantes = await Restaurantes.find()
      res.status(200).send(restaurantes)
    } catch (error) {
      error500(error)
    }
  },

  async getRestauranteById(req, res) {
    const restauranteId = req.params.id

    try {
      if (checkID(restauranteId, res)) return
      const restaurante = await Restaurantes.findById(restauranteId)
      if (!restaurante) {
        return res
          .status(401)
          .send({ message: 'Restaurante no encontrado por id' })
      }
      res.status(200).send(restaurante)
    } catch (error) {
      error500(error)
    }
  },

  async crearRestaurante(req, res) {
    try {
      if (await checkData('Restaurante', req.body, res)) return
      if (
        (await checkEmailDuplicado('Restaurante', req.body.Email, res)) !== null
      )
        return
      const restaurante = await Restaurantes.create({ ...req.body })
      res.status(201).send({ message: 'restaurante creado', restaurante })
    } catch (error) {
      error500(error)
    }
  },
}

module.exports = RestaurantesController
