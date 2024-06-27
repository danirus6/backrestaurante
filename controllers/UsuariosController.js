const Usuarios = require('../models/Usuarios')
const {
  checkID,
  error500,
  checkData,
  checkEmailDuplicado,
} = require('../middlewares/validations')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UsuariosController = {
  async getUsuarios(req, res) {
    try {
      const usuarios = await Usuarios.find()
      res.status(200).send(usuarios)
    } catch (error) {
      error500(error, res)
    }
  },

  async getUsuarioById(req, res) {
    const usuarioId = req.params.id

    try {
      if (checkID(usuarioId, res)) return
      const usuario = await Usuarios.findById(usuarioId)
      if (!usuario) {
        return res.status(401).send({ message: 'Usuario no encontrado por id' })
      }
      res.status(200).send(usuario)
    } catch (error) {
      error500(error, res)
    }
  },

  async crearUsuario(req, res) {
    try {
      if (await checkData('Usuario', req.body, res)) return
      if ((await checkEmailDuplicado('Usuario', req.body.Email, res)) !== null)
        return
      const Password = bcrypt.hashSync(req.body.Password, 10)
      const usuario = await Usuarios.create({ ...req.body, Password })
      res.status(201).send({ message: 'usuario creado', usuario })
    } catch (error) {
      error500(error, res)
    }
  },

  async actualizarUsuario(req, res) {
    const usuarioId = req.params.id

    try {
      if (checkID(usuarioId, res)) return
      if (
        req.body.Email &&
        (await checkEmailDuplicado('Usuario', req.body.Email, res)) !== null
      )
        return
      const nuevoUsuario = {
        ...req.body,
      }
      const usuarioActualizado = await Usuarios.findByIdAndUpdate(
        usuarioId,
        nuevoUsuario,
        { new: true }
      )
      res
        .status(200)
        .send({ message: 'usuario actualizado', usuarioActualizado })
    } catch (error) {
      error500(error, res)
    }
  },

  async eliminarUsuario(req, res) {
    const usuarioId = req.params.id

    try {
      if (checkID(usuarioId, res)) return
      const usuarioBorrado = await Usuarios.findByIdAndDelete(usuarioId)
      usuarioBorrado === null
        ? res.status(400).send({ message: 'id de usuario no encontrado' })
        : res.status(200).send({ messsage: 'usuario borrado' })
    } catch (error) {
      error500(error, res)
    }
  },
}

module.exports = UsuariosController
