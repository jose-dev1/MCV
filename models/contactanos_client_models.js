import transporter from './coneccionEmail.js'

export class enviarCorreoModelos {
  static async sendEmail ({ input }) {
    const { nombre, apellido, email, celular, mensaje } = input
    try {
      const mailOptions = {
        from: 'samivazqueles@gmail.com',
        to: 'samuelvh2022@gmail.com',
        subject: 'Nuevo correo de tu cliente',
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif; background-color: #F3F4F6; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative;">
            <i class="fas fa-dog" style="color: #4CAF50; font-size: 48px; position: absolute; top: -25px; left: 20px;"></i>
            <h2 style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Nuevo correo de un cliente:</h2>
            <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Nombre del cliente:</strong> ${nombre} ${apellido}</p>
            <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Email del cliente:</strong> ${email}</p>
            <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Teléfono del cliente:</strong> ${celular}</p>
            <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Mensaje del cliente:</strong> ${mensaje}</p>
          </div>
        `
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Correo electrónico enviado: ' + info.response)
        }
      })
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error)
    }
  }
}
