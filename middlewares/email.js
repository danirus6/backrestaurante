// import { Resend } from 'resend'
process.loadEnvFile()
const RESEND_APIKEY = process.env.RESEND_APIKEY
const PORT = process.env.PORT
const { Resend } = require('resend')

const resend = new Resend(RESEND_APIKEY)

// enviamos email de confirmación
const emailResend = {
  async sendEmail(email, idToken) {
    const url = `http://localhost:${PORT}/usuarios/confirm/${idToken}`
    const { data, error } = await resend.emails.send({
      // error al poner como mail de salida uno de gmail o similar, sería posible usar un dominio propio, a valorar
      // pendiente crear endpoint para marcar usuario como confirmado
      from: 'Proyecto Restaurante <proyectorestaurante9@gmail.com>',
      to: [email],
      subject: 'Confirmación de nuevo usuario',
      html: `Por favor pulsa <a href='${url}'><strong>aquí</strong></a> para confirmar tu usuario`,
    })

    if (error) {
      return console.error({ error })
    }

    console.log({ data })
  },

  confirmEmail(res, model) {
    return res.send(`<div style='width:100%; height:100%; background-color: lightgray; display:flex; 
      flex-direction:column; justify-content:center; align-items:center'>
      <h1>¡Tu perfil ha sido confirmado con éxito!</h1>
      <h2><a href='http://localhost:8081/${model}/login'>Accede ahora</a></h2>
    </div>`)
  },
}

module.exports = emailResend
