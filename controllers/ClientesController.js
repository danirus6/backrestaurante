const Clientes = require('../models/Clientes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkData = (data, res) => {
  // comprueba que los datos obligatorios estén introducidos
  if (!data.Password)
    return res.status(400).send({ message: 'contraseña requerida' })
  if (!data.Nombre) return res.status(400).send({ message: 'nombre requerido' })
  if (!data.Email) return res.status(400).send({ message: 'email requerido' })
}

const checkID = (id, res) => {
  // comprueba que el id tenga la longitud adecuada
  if (id === undefined || id.length !== 24)
    return res.status(401).send({ message: 'id de cliente erróneo' })
}

const checkEmailDuplicado = async (email, res) => {
  // comprueba que el email no esté ya utilizado
  const checkEmail = await Clientes.findOne({ Email: email })
  if (checkEmail === null) return checkEmail
  res.status(400).send({ message: 'email ya existente' })
}

const ClientesController = {
  // GET - Obtener todos los clientes
  async getClientes(req, res) {
    try {
      const clientes = await Clientes.find()
      res.status(200).send(clientes)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Por favor hable con el administrador' })
    }
  },

  // GET - Obtener un cliente por ID
  async getClienteById(req, res) {
    const clienteId = req.params.id

    try {
      if (checkID(clienteId, res)) return
      const cliente = await Clientes.findById(clienteId)
      if (!cliente) {
        res.status(401).send({ message: 'Cliente no encontrado por id' })
      }
      res.status(200).send(cliente)
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Por favor hable con el administrador' })
    }
  },

  // POST - Crear un nuevo cliente
  async crearCliente(req, res) {
    try {
      if (await checkData(req.body, res)) return
      if ((await checkEmailDuplicado(req.body.Email, res)) !== null) return
      const password = bcrypt.hashSync(req.body.Password, 10)
      const cliente = await Clientes.create({ ...req.body, password })
      res.status(201).send({ message: 'usuario creado', cliente })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Por favor hable con el administrador' })
    }
  },

  // PUT - Actualizar un cliente
  async actualizarCliente(req, res) {
    const clienteId = req.params.id

    try {
      if (checkID(clienteId, res)) return
      if (
        req.body.Email &&
        (await checkEmailDuplicado(req.body.Email, res)) !== null
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
      console.log(error)
      res.status(500).send({ message: 'Por favor hable con el administrador' })
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
      console.log(error)
      res.status(500).send({ message: 'Por favor hable con el administrador' })
    }
  },
}

module.exports = ClientesController
