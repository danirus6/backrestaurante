const { response } = require('express')
const Clientes = require('../models/Clientes')

// GET - Obtener todos los clientes
const getClientes = async (req, res = response) => {
  try {
    const clientes = await Clientes.find()
    res.json({
      ok: true,
      clientes,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}
// GET - Obtener un cliente por ID
const getClienteById = async (req, res = response) => {
  const clienteId = req.params.id
  try {
    const cliente = await Clientes.findById(clienteId)
    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: 'Cliente no encontrado por id',
      })
    }
    res.json({
      ok: true,
      cliente,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

// POST - Crear un nuevo cliente
const crearCliente = async (req, res = response) => {
  const cliente = new Clientes(req.body)
  try {
    const clienteGuardado = await Clientes.save()
    res.json({
      ok: true,
      cliente: clienteGuardado,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

// PUT - Actualizar un cliente
const actualizarCliente = async (req, res = response) => {
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
}

// DELETE - Eliminar un cliente
const eliminarCliente = async (req, res = response) => {
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
}
