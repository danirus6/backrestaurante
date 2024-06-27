const express = require('express')
const router = express.Router()
const RestaurantesController = require('../controllers/RestaurantesController')

router.get('/', RestaurantesController.getRestaurantes)
router.get('/:id?', RestaurantesController.getRestauranteById)
router.post('/', RestaurantesController.crearRestaurante)
router.put('/:id?', RestaurantesController.actualizarRestaurante)

module.exports = router
