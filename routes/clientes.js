const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/ClientesController')

// Routes
router.get('/', clientesController.getClientes)
router.post('/', clientesController.crearCliente)
router.get('/?:id', clientesController.getClienteById)
router.put('/:id?', clientesController.actualizarCliente)
router.delete('/:id?', clientesController.eliminarCliente)

module.exports = router
