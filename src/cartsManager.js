import fs from'fs'
import { getFindIndex } from './utils.js'

class CartsManager {
    constructor(path){
        this.path = path
    }
    async getCarts(){
        
        try {
            if(fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path,'utf-8')
                if(!info) {
                    console.log('Info inexistente');
                    return []
                }
                const carts = JSON.parse(info)
                if (carts) {
                    return carts
                }
            }
            return []
        } catch (error) {
            return error
        }
    }

    async createCart(){

        try {            
            const cartId = await this.#generateIdCart()
            const cart = {
                id: cartId,
                product: []
            }
            
            const carts = await this.getCarts()
            carts.push(cart);
            const jsonCarts = await JSON.stringify(carts)
            await fs.promises.writeFile(this.path,jsonCarts);
            return cartId
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getCartById(cartId){
        const cartIdNumber = parseInt(cartId)
        const carts = await this.getCarts()
        const cart = carts.find(e=>e.id === cartIdNumber)
        return cart

    }

    async updateCartFile(cartId, newCart) {
        const carts = await this.getCarts()
        const index = getFindIndex(carts, cartId) //carts.findIndex(cart => cart.id === cartId)
        if (index === -1) {
            return 'Error al actualizar carrito'
        }
        carts[index] = newCart;
        return carts;
    }

    async addProductCart(cartId, productId){
        const cart = await this.getCartById(cartId)
        const index = getFindIndex(cart.product, productId)// cart.product.findIndex(product => product.id=== productId)
        if (index !== -1) {
            // Si existe, incrementar la propiedad quantity en uno
            cart.product[index].quantity += 1;
        } else {
            // Si no existe, agregar un nuevo objeto al array
            cart.product.push({ id: productId, quantity: 1 })
        }
        const newCarts = await this.updateCartFile(cartId, cart)
        const jsonCarts = JSON.stringify(newCarts)
        await fs.promises.writeFile(this.path, jsonCarts);
    }   

    async #generateIdCart(){
        const carts = await this.getCarts()
        return carts.length
        ? carts[carts.length-1].id+1
        : 1
        // to do hacer id con Time, crea un id unico.
    }

    async #codigoExistente(codigo) {
        const carts = await this.getProducts()
        const result = carts.some((cart) => cart.codigo === codigo);
        return result
    }
    
}
export const cartsManager = new CartsManager('Carts.json')
