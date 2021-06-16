const nodemailer = require('nodemailer');

module.exports = (formulario) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'userkndyfood@gmail.com', 
      pass: 'jkirropkcvajoscb' 
    }
  });

  const mailOptions = {
    from: `"${formulario.nombre} 👻" <${formulario.email}>`,
    to: 'kndyfood267@gmail.com', // Destinatario
    subject: 'Servicio al cliente',
    html: `
    <strong> ${formulario.nombre}, ${formulario.email} </strong>, desea contactarse con usted.<br><br>
    <strong>Mensaje:</strong> ${formulario.mensaje}
    `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}