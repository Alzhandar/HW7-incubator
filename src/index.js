const express = require('express');
const fs = require('fs');
const { scrape2Play } = require('./services/scraperService');
const { startCronJobs } = require('./cronJobs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = './data/items.json'; 

const saveDataToFile = (data) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to data file:', err);
        } else {
            console.log(`Data saved to ${dataFilePath}`);
        }
    });
};

let savedData = [];
try {
    savedData = require(dataFilePath);
} catch (err) {
    console.warn(`File ${dataFilePath} Empty data.`);
}

app.get('/scrape', async (req, res) => {
    try {
        const items = await scrape2Play();
        savedData = items; 
        saveDataToFile(savedData); 
        res.json(items);
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'Failed to data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    startCronJobs(() => {
        saveDataToFile(savedData);
    });
});
