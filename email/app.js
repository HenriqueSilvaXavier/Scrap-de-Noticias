require('dotenv').config();
const nodemailer = require('nodemailer');
const fetchData = require('../scraper/app.js'); // Importando o `fetchData`

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail() {
  try {
    // Obtenha as notícias
    const noticias = await fetchData();
    
    // Crie o HTML das notícias
    let noticiasHtml = noticias.map((noticia) => `
      <div style="margin-bottom: 20px;">
        <h2>${noticia.titulo}</h2>
        <img src="${noticia.imagem}" alt="Imagem da notícia" style="max-width: 100%; height: auto;" />
        <p><a href="${noticia.link}" target="_blank">Leia mais</a></p>
      </div>
    `).join('');

    const info = await transporter.sendMail({
      from: `"Nome do Remetente" <${process.env.EMAIL_USER}>`,
      to: 'henriquesx44@gmail.com',
      subject: 'Assunto do E-mail',
      text: 'Confira as últimas notícias.',
      html: `
        <h1>Últimas Notícias</h1>
        ${noticiasHtml}
      `,
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

sendEmail();
