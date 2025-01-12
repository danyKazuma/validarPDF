module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { urls } = req.body; // URLs enviadas desde el cliente

    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ error: 'URLs no proporcionadas o formato inválido' });
    }

    // Procesar las URLs
    const results = urls.map(url => {
        return {
            url: url,
            status: 'Procesado correctamente',
        };
    });

    res.status(200).json({ success: true, data: results });
};
