const Clientes = require('../models/Customers')
const {
  checkID,
  error500,
  checkData,
  checkEmailDuplicado,
} = require('../middlewares/validations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const checkData = (collection, data, res) => {
//   // comprueba que los datos obligatorios estén introducidos
//   if (!data.Password && collection === 'Cliente')
//     return res.status(400).send({ message: 'contraseña requerida' })
//   if (!data.Nombre) return res.status(400).send({ message: 'nombre requerido' })
//   if (!data.Email) return res.status(400).send({ message: 'email requerido' })
//   if (!data.Calle && collection === 'Restaurante')
//     return res.status(400).send({ message: 'Calle requerida' })
//   if (!data.CP && collection === 'Restaurante')
//     return res.status(400).send({ message: 'CP requerido' })
//   if (!data.Ciudad && collection === 'Restaurante')
//     return res.status(400).send({ message: 'Ciudad requerida' })
//   if (!data.Provincia && collection === 'Restaurante')
//     return res.status(400).send({ message: 'Provincia requerida' })
// }

// const checkEmailDuplicado = async (email, res) => {
//   // comprueba que el email no esté ya utilizado
//   const checkEmail = await Clientes.findOne({ Email: email })
//   if (checkEmail === null) return checkEmail
//   res.status(400).send({ message: 'email ya existente' })
// }

const ClientesController = {
  // GET - Obtener todos los clientes
  async getClientes(req, res) {
    try {
      const clientes = await Clientes.find()
      res.status(200).send(clientes)
    } catch (error) {
      error500(error)
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
      error500(error)
    }
  },

  // POST - Crear un nuevo cliente
  async crearCliente(req, res) {
    try {
      if (await checkData('Cliente', req.body, res)) return
      if ((await checkEmailDuplicado('Cliente', req.body.Email, res)) !== null)
        return
      const password = bcrypt.hashSync(req.body.Password, 10)
      const cliente = await Clientes.create({ ...req.body, password })
      res.status(201).send({ message: 'usuario creado', cliente })
    } catch (error) {
      error500(error)
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
      error500(error)
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
      error500(error)
    }
  },
}

module.exports = ClientesController
