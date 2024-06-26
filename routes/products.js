const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = app => {
    const Products = app.db.models.Products;

    app.get("/products", (req, res) => {
        Products.findAll({})
            .then(products => {
                res.json(products.map(product => ({
                    id: product.id,
                    titleProducts: product.titleProducts,
                    foodStatus: product.foodStatus,
                    price: product.price,
                    quantity: product.quantity,
                    imageUrl: product.imageUrl
                })));
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    // Rota para buscar um produto por ID
    app.get("/products/:id", (req, res) => {
        const productId = req.params.id;

        Products.findByPk(productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({ error: 'Produto não encontrado' });
                }
                res.json(product);
            })
            .catch(error => {
                console.error('Erro ao buscar produto:', error);
                res.status(500).json({ error: 'Erro interno ao buscar o produto' });
            });
    });

    app.post("/products", upload.single('image'), async (req, res) => {
        const { titleProducts, price, quantity, foodStatus } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const products = await Products.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']]
            });

            let newId = 1;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id !== newId) {
                    break;
                }
                newId++;
            }

            const newProduct = await Products.create({ id: newId, titleProducts, price, quantity, foodStatus, imageUrl });
            res.json(newProduct);
        } catch (error) {
            res.status(412).json({ msg: error.message });
        }
    });

    // Rota para atualizar um produto por ID
    app.put("/products/:id", (req, res) => {
        const productId = req.params.id;
        const { titleProducts, foodStatus, price, quantity } = req.body;

        Products.findByPk(productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({ error: 'Produto não encontrado' });
                }

                // Atualiza os campos do produto
                product.titleProducts = titleProducts;
                product.foodStatus = foodStatus;
                product.price = price;
                product.quantity = quantity;

                // Salva as mudanças no banco de dados
                return product.save()
                    .then(updatedProduct => {
                        res.json(updatedProduct);
                    })
                    .catch(error => {
                        res.status(500).json({ error: 'Erro interno ao atualizar o produto' });
                    });
            })
            .catch(error => {
                res.status(500).json({ error: 'Erro interno ao buscar o produto' });
            });
    });

    // Rota para deletar um produto por ID
    app.delete("/products/:id", (req, res) => {
        const productId = req.params.id;

        // Deleta o produto do banco de dados
        Products.destroy({ where: { id: productId } })
            .then(result => {
                if (result === 1) {
                    res.sendStatus(204); // Produto deletado com sucesso
                } else {
                    res.sendStatus(404); // Produto não encontrado
                }
            })
            .catch(error => {
                console.error('Erro ao deletar produto:', error);
                res.status(500).json({ error: 'Erro interno ao deletar produto' });
            });
    });
};
