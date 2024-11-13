const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML

const url = 'https://www.cnnbrasil.com.br/tudo-sobre/geopolitica/';

// Modifique o final do arquivo para exportar `fetchData`
async function fetchData() {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const tabelaNoticias = $('.home__list__item');
        const noticias = [];

        tabelaNoticias.slice(0, 10).each(function () {
            const titulo = $(this).find('.news-item-header__title').text().trim();
            const imagem = $(this).find('picture > img').attr('src')?.trim() || 'Imagem não disponível';
            const link = $(this).find('a.home__list__tag').attr('href')?.trim() || 'Link não disponível';

            if (titulo && imagem && link) {
                noticias.push({ titulo, imagem, link });
            }
        });

        return noticias;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

module.exports = fetchData;


// Executa a função
fetchData();
