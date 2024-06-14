const axios = require('axios');
const cheerio = require('cheerio');

const scrape2Play = async () => {
    try {
        const { data } = await axios.get('https://2play.kz/collection/aksessuary/playstation-4/');
        const $ = cheerio.load(data);
        const items = [];

        $('.list-product').each((index, element) => {
            const title = $(element).find('.product-link').text().trim();
            const price = $(element).find('.current-price').text().trim();
            const imageUrl = $(element).find('.first-img').attr('src');

            items.push({ title, price, imageUrl });
        });
        return items;
    } catch (error) {
        console.error('Error scraping 2play.kz:', error);
        return [];
    }
};

module.exports = { scrape2Play };
