const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para todos los orígenes
app.use(cors());

// Middleware para analizar JSON
app.use(express.json());

// Ruta para analizar las URLs de los archivos
app.post('/analizar-archivos', async (req, res) => {
    const urls = req.body.urls; // Esperamos un array de URLs
    
    // Aquí puedes agregar la lógica para procesar las URLs
    const results = [];

    for (const url of urls) {
        try {
            const response = await axios.head(url);  // Obtener solo los encabezados
            const size = response.headers['content-length'];  // Extraer el tamaño del archivo

            // Extraer el identificador del archivo (de acuerdo a la lógica que mencionaste antes)
            const fileName = url.split('Orders/')[1].split('_')[0];
            
            results.push({
                url: url,
                size: size,
                identificador: fileName,
            });
        } catch (error) {
            console.error('Error al procesar la URL:', url);
            results.push({
                url: url,
                error: 'No se pudo obtener el archivo',
            });
        }
    }

    // Enviar la respuesta al cliente
    res.json(results);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API en ejecución en http://localhost:${port}`);
});
