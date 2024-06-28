// importamos los modelos para usarlos en checkEmailDuplicado
const Clientes = require('../models/Customers')
const Restaurantes = require('../models/Restaurants')

const validations = {
  checkID(id, res) {
    // comprueba que el id tenga la longitud adecuada
    if (id === undefined || id.length !== 24)
      return res.status(401).send({ message: 'id erróneo' })
  },

  error500(error) {
    console.error(error)
    return res
      .status(500)
      .send({ message: 'Por favor hable con el administrador' })
  },

  checkData(collection, data, res) {
    // comprueba que los datos obligatorios estén introducidos
    if (!data.Password && collection === 'Cliente')
      return res.status(400).send({ message: 'contraseña requerida' })
    if (!data.Nombre)
      return res.status(400).send({ message: 'nombre requerido' })
    if (!data.Email) return res.status(400).send({ message: 'email requerido' })
    if (!data.Telefono && collection === 'Restaurante')
      return res.status(400).send({ message: 'Telefono requerido' })
    if (!data.Calle && collection === 'Restaurante')
      return res.status(400).send({ message: 'Calle requerida' })
    if (!data.CP && collection === 'Restaurante')
      return res.status(400).send({ message: 'CP requerido' })
    if (!data.Ciudad && collection === 'Restaurante')
      return res.status(400).send({ message: 'Ciudad requerida' })
    if (!data.Provincia && collection === 'Restaurante')
      return res.status(400).send({ message: 'Provincia requerida' })
  },

  async checkEmailDuplicado(collection, email, res) {
    // comprueba que el email no esté ya utilizado
    let model
    switch (collection) {
      case 'Cliente':
        model = Clientes
        break
      case 'Restaurante':
        model = Restaurantes
        break
    }
    const checkEmail = await model.findOne({ Email: email })
    if (checkEmail === null) return checkEmail
    return res.status(400).send({ message: 'email ya existente' })
  },
}

module.exports = validations
