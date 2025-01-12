const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para que cualquier cliente pueda acceder a la API
app.use(cors());
app.use(express.json());

// Ruta principal
app.post('/analizar', async (req, res) => {
    const { urls } = req.body;

    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ error: 'URLs no proporcionadas o formato inválido' });
    }

    // Procesar las URLs
    const results = urls.map(url => {
        const identificador = url.split('Orders/')[1]?.split('_')[0];
        return {
            url: url,
            identificador: identificador,
            status: 'Procesado correctamente',
        };
    });

    res.status(200).json({ success: true, data: results });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor API ejecutándose en http://localhost:${port}`);
});
