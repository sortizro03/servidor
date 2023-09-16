import express from "express";
import { productManager } from './desafioArchivos.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  try {
    let products = await productManager.getProducts(); 
    if (!products.length) {
      res.status(200).json({ message: 'No hay productos' });
      
    } else {
      if (limit !== undefined) {
        products = products.slice(0, parseInt(limit));
        
      }
      res.status(200).json({ message: 'Se encontraron productos', products });
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params
    try {
      const product = await productManager.getProductById(+pid)
      if (!product) {
        res.status(400).json({ message: 'No se encontro producto con ese ID' })
      } else {
        res.status(200).json({ message: 'Producto encontrado', product })
      }
    } catch (error) {
      res.status(500).json({ message: error })
    }
})

app.listen(8080, () => {
  console.log('Escuchando al puerto 8080')
})