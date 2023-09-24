import { Router } from "express"; // solo necesitamos la funcionalidad de express que maneje las rutas
import { productManager } from './desafioArchivos.js'
const router = Router();

router.get('/', async (req, res) => {
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
router.get('/:pid', async (req, res) => {
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
router.post('/', async (req, res) => {
  const product = req.body
  // to do staus error when false
  if (!product.nombre || !product.descripcion || !product.precio || !product.imagen || !product.codigo || !product.stock || !product.status || !product.category) {
    return res.status(400).json({ message: "Falta informacion" });
  }
  try {
    const newProduct = await productManager.createProduct(product);
    res.status(200).json({ message: "Producto creado", newProduct });
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

router.put('/:pid', async (req, res) => {
  const idProduct = req.params.pid
  const product = req.body
  try {
    const update = await productManager.updateProduct(+idProduct,product);
    if (update === -1) {
      res.status(400).json({ message: "No se encontro producto" });
    } else {
      res.status(200).json({ message: "Se actualizo el producto" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
})
router.delete('/:pid', async (req, res) => {
  const {pid} = req.params
  try {
    const id = await productManager.deleteProduct(+pid);
    res.status(200).json({ message: "producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

export default router