const cron = require('node-cron');
const { scrape2Play } = require('./services/scraperService');

const startCronJobs = () => {
    
    cron.schedule('0 * * * *', async () => {
        console.log('Running scrape task every hour');
        const items = await scrape2Play();
        console.log('Scraped items:', items);
    });

    cron.schedule('*/30 * * * *', async () => {
        console.log('Running scrape task every 30 minutes');
        const items = await scrape2Play();
        console.log('Scraped items:', items);
    });

    cron.schedule('0 0 * * *', async () => {
        console.log('Running scrape task every day at midnight');
        const items = await scrape2Play();
        console.log('Scraped items:', items);
    });
};

module.exports = { startCronJobs };
