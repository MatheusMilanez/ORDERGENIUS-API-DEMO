module.exports = (io, app) => {
    const Products = app.db.models.Products;

    io.on('connection', socket => {
        console.log('Novo cliente conectado');

        // Emitir lista de produtos ao conectar
        Products.findAll({})
            .then(products => {
                socket.emit('productUpdate', products);
            })
            .catch(error => {
                console.error('Erro ao enviar lista de produtos:', error);
            });

        // Escutar por eventos de atualização de produtos
        socket.on('productUpdated', async () => {
            try {
                const products = await Products.findAll({});
                io.emit('productUpdate', products); // Emitir para todos os clientes conectados
            } catch (error) {
                console.error('Erro ao buscar produtos atualizados:', error);
            }
        });

        // Lógica para desconectar
        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};
