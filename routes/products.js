const productsRouter = require('express').Router();

const { getAllProducts, getProductByID  } = require('../db/products')

productsRouter.get('/', async (req, res , next) => {
    try {
        const allProducts = await getAllProducts();

        res.send(allProducts)

    } catch ({name, message})  {
        next ({name, message})
    }
})