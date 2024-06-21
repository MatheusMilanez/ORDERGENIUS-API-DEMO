const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

    app.post("/products", upload.single('image'), (req, res) => {
        const { titleProducts, price, quantity, foodStatus } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        Products.create({ titleProducts, price, quantity, foodStatus, imageUrl })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.put("/products/:id", (req, res) => {
        Products.update(req.body, { where: { id: req.params.id } })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.delete("/products/:id", (req, res) => {
        Products.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    return res.status(404).json({ msg: 'Produto não encontrado.' });
                }

                if (product.imageUrl) {
                    const imagePath = path.join(__dirname, '../', product.imageUrl);
                    fs.unlinkSync(imagePath);
                }

                return product.destroy()
                    .then(() => res.sendStatus(204))
                    .catch(error => {
                        res.status(412).json({ msg: error.message });
                    });
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
};
