const Clientes = require('../models/Clientes')
const {
  checkID,
  error500,
  checkData,
  checkEmailDuplicado,
} = require('../middlewares/validations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ClientesController = {
  // GET - Obtener todos los clientes
  async getClientes(req, res) {
    try {
      const clientes = await Clientes.find()
      res.status(200).send(clientes)
    } catch (error) {
      error500(error, res)
    }
  },

  // GET - Obtener un cliente por ID
  async getClienteById(req, res) {
    const clienteId = req.params.id

    try {
      if (checkID(clienteId, res)) return
      const cliente = await Clientes.findById(clienteId)
      if (!cliente) {
        return res.status(401).send({ message: 'Cliente no encontrado por id' })
      }
      res.status(200).send(cliente)
    } catch (error) {
      error500(error, res)
    }
  },

  // POST - Crear un nuevo cliente
  async crearCliente(req, res) {
    try {
      if (await checkData('Cliente', req.body, res)) return
      if ((await checkEmailDuplicado('Cliente', req.body.Email, res)) !== null)
        return
      const Password = bcrypt.hashSync(req.body.Password, 10)
      const cliente = await Clientes.create({ ...req.body, Password })
      res.status(201).send({ message: 'cliente creado', cliente })
    } catch (error) {
      error500(error, res)
    }
  },

  // PUT - Actualizar un cliente
  async actualizarCliente(req, res) {
    const clienteId = req.params.id

    try {
      if (checkID(clienteId, res)) return
      if (
        req.body.Email &&
        (await checkEmailDuplicado('Cliente', req.body.Email, res)) !== null
      )
        return
      const nuevoCliente = {
        ...req.body,
      }
      const clienteActualizado = await Clientes.findByIdAndUpdate(
        clienteId,
        nuevoCliente,
        { new: true }
      )
      res.json({
        ok: true,
        cliente: clienteActualizado,
      })
    } catch (error) {
      error500(error, res)
    }
  },

  // DELETE - Eliminar un cliente
  async eliminarCliente(req, res) {
    const clienteId = req.params.id
    try {
      if (checkID(clienteId, res)) return
      const clienteBorrado = await Clientes.findByIdAndDelete(clienteId)
      clienteBorrado === null
        ? res.status(400).send({ message: 'id de cliente no encontrado' })
        : res.status(200).send({ messsage: 'cliente borrado' })
    } catch (error) {
      error500(error, res)
    }
  },
}

module.exports = ClientesController
