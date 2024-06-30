process.loadEnvFile()
const Usuarios = require('../models/Usuarios')
const { sendEmail, confirmEmail } = require('../middlewares/email')
const {
  checkID,
  error500,
  checkData,
  checkEmailDuplicado,
  checkTokenData,
} = require('../middlewares/validations')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

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
      const idToken = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET)
      // revisar notas de middleware email.js
      // await sendEmail(req.body.Email, idToken)
      res.status(201).send({
        message: 'usuario creado, revisa tu email para confirmar el registro',
        usuario,
      })
    } catch (error) {
      if (error?.code === 11000)
        return res
          .status(401)
          .send({ message: 'el email ya existe, elige otro' })

      if (error?.errors?.Email?.kind === 'regexp')
        return res.status(401).send({ message: 'formato de email erróneo' })
      error500(error, res)
    }
  },

  async confirmarUsuario(req, res) {
    try {
      const token = req.params.idToken
      const payload = jwt.verify(token, JWT_SECRET)
      await Usuarios.findByIdAndUpdate(payload._id, {
        $set: { Confirmado: 'true' },
      })
      confirmEmail(res, 'usuarios')
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
      // revisamos que hay token en la request, y que coincida con el usuario
      if (!req.headers.authorization)
        return res.status(401).send({ message: 'falta el token' })
      if (checkTokenData('Usuario', usuarioId, req.headers.authorization, res))
        return
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
