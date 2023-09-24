import fs from'fs'

class CartsManager {
    constructor(path){
        this.path = path
    }
    async getCarts(){
        
        try {
            if(fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path,'utf-8')
                const carts = JSON.parse(info)
                return carts

            } else {
                return []
            }
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
        const carts = await this.getCarts()
        const cart = carts.find(e=>e.id === cartId)
        return cart

    }

    async addProductCart(cartId, productId){
        const cart = await this.getCartById(cartId)
        const index = cart.products.findIndex(product => productId=== cartId);
        if (index !== -1) {
            // Si existe, incrementar la propiedad quantity en uno
            cart.products[index].quantity += 1;
          } else {
            // Si no existe, agregar un nuevo objeto al array
            cart.products.push({ id: id, quantity: 1 });
        }
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
