const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/UsuariosController')

router.get('/', usuariosController.getUsuarios)
router.get('/:id?', usuariosController.getUsuarioById)
router.post('/', usuariosController.crearUsuario)
router.put('/:id?', usuariosController.actualizarUsuario)
router.delete('/:id?', usuariosController.eliminarUsuario)

module.exports = router
