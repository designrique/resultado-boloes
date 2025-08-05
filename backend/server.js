const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3001; // Porta para este serviço rodar

app.use(cors());

// Endpoint: /generate?lottery=Mega-Sena&template=t-oficial
app.get('/generate', async (req, res) => {
    const { lottery, template } = req.query;
    if (!lottery || !template) {
        return res.status(400).send('Parâmetros "lottery" e "template" são obrigatórios.');
    }

    // URL do seu app React (certifique-se que ele está rodando e acessível)
    // Se este serviço rodar na mesma VPS, você pode usar localhost ou o IP do docker.
    const reactAppUrl = `http://localhost:8080/render?lottery=${lottery}&template=${template}`;

    let browser = null;
    try {
        console.log(`Iniciando geração para: ${reactAppUrl}`);
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessário para rodar no Docker/Linux
            headless: "new"
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 1200 });
        
        await page.goto(reactAppUrl, { waitUntil: 'networkidle0' }); // Espera a renderização completa

        const elementToCapture = await page.$('#capture-target');
        if (!elementToCapture) {
            throw new Error('Elemento #capture-target não encontrado na página.');
        }

        const imageBuffer = await elementToCapture.screenshot({ type: 'png' });
        
        console.log('Imagem gerada com sucesso.');
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);

    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        res.status(500).send(`Erro interno ao gerar a imagem: ${error.message}`);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor de geração de imagem rodando em http://localhost:${port}`);
});