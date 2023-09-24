import { Router } from "express";
import { cartsManager } from "../cartsManager";
const router = Router();

router.post('/', async (req, res) => {
    try {
      let products = await cartsManager.createCart();
      res.status(200).json({ message: 'Se genero carrito', products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        let cartById = await cartsManager.getCartById(cid);
        res.status(200).json({ message: 'Se consulto carrito', cartById });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        let response = await cartsManager.addProductCart(cid, pid);
        res.status(200).json({ message: 'Se Agrego producto al carrito', response });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

export default router