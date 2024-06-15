const Clientes = require('../models/Clientes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ClientesController = {
  // GET - Obtener todos los clientes
  async getClientes(req, res) {
    try {
      const clientes = await Clientes.find()
      res.status(200).send(clientes)
    } catch (error) {
      console.error(error)
      res.status(500).send('Por favor hable con el administrador')
    }
  },

  // GET - Obtener un cliente por ID
  async getClienteById(req, res) {
    const clienteId = req.params.id
    try {
      const cliente = await Clientes.findById(clienteId)
      if (!cliente) {
        res.status(401).send('Cliente no encontrado por id')
      }
      res.status(200).send(cliente)
    } catch (error) {
      console.log(error)
      res.status(500).send('Por favor hable con el administrador')
    }
  },

  // POST - Crear un nuevo cliente
  async crearCliente(req, res) {
    try {
      if (!req.body.Password)
        res.status(400).send({ message: 'contraseña requerida' })
      const password = bcrypt.hashSync(req.body.Password, 10)
      const cliente = await Clientes.create({ ...req.body, password })
      res.status(201).send({ message: 'usuario creado', cliente })
    } catch (error) {
      console.error(error)
      res.status(500).send('Por favor hable con el administrador')
    }
  },

  // PUT - Actualizar un cliente
  async actualizarCliente(req, res) {
    const clienteId = req.params.id
    try {
      const cliente = await Clientes.findById(clienteId)
      if (!cliente) {
        return res.status(404).json({
          ok: false,
          msg: 'Cliente no encontrado por id',
        })
      }
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
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
      })
    }
  },

  // DELETE - Eliminar un cliente
  async eliminarCliente(req, res) {
    const clienteId = req.params.id
    try {
      const cliente = await Clientes.findById(clienteId)
      if (!cliente) {
        return res.status(404).json({
          ok: false,
          msg: 'Cliente no encontrado por id',
        })
      }
      await Clientes.findByIdAndDelete(clienteId)
      res.json({
        ok: true,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
      })
    }
  },
}

module.exports = ClientesController
