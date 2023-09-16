import fs from'fs'



class ProductManager{

    constructor(path){
        this.path = path
    }
    async getProducts(){
        
        try {
            if(fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path,'utf-8')
                const products = JSON.parse(info)
                return products

            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createProduct(product){
        if(!product.nombre || !product.descripcion || !product.precio || !product.imagen || !product.codigo || !product.stock){
            return 'falta informacion';
        }
        try {
            const products = await this.getProducts()

            if (await this.#codigoExistente(product.codigo)) {
                return 'El codigo del producto ya existe';
            }
            
            product.id = await this.#generarIdProducto()

            products.push(product);
            const jsonProduct = await JSON.stringify(products)
            await fs.promises.writeFile(this.path,jsonProduct);
            return product
        } catch (error) {
            console.log(error)
            return error
        }
    }


    async getProductById(idProducto){
        const products = await this.getProducts()
        const product = products.find(e=>e.id === idProducto)
        return product

    }

    async deleteProduct(idProducto){
        try {
            const products = await this.getProducts()
            const newArrayProducts = products.filter(e=>e.id!==idProducto)
            await fs.promises.writeFile(this.path,JSON.stringify(newArrayProducts))
        } catch (error) {
            return error
        }
    }

    async updateProduct(idProducto, newProduct){
        const products = await this.getProducts()
        const product = await this.getProductById(idProducto)
        if (product){
            Object.keys(newProduct).map((key => {
                product[key] = newProduct[key] // actualizando los atributos del objeto viejo
            }))
        const productIndex = products.findIndex((product) => {product.id === idProducto})
        products.productIndex = product // cambiando el registro del objeto viejo por el nuevo
        // guardar en json
        fs.promises.writeFile(this.path, JSON.stringify(products))
        return product
        }
    }
    
    async #generarIdProducto(){
        const products = await this.getProducts()
        return products.length
        ? products[products.length-1].id+1
        : 1
    }

    async #codigoExistente(codigo) {
        const products = await this.getProducts()
        const result = products.some((product) => product.codigo === codigo);
        return result
    }

}

const product1 = {
    nombre : 'CELULAR',
    descripcion : 'gama alta',
    precio : '200',
    imagen : 'img',
    codigo : '432',
    stock :'4'
}

const product2 = {
    nombre : 'COMPUTADOR',
    descripcion : 'gama baja',
    precio : '100',
    imagen : 'img',
    codigo : '367',
    stock :'13'
}

const product3 = {
    nombre : 'IPAD',
    descripcion : 'gama alta',
    precio : '230',
    imagen : 'img',
    codigo : '456',
    stock :'9'
}

const product4 = {
    nombre : 'TELEVISOR',
    descripcion : 'gama alta',
    precio : '400',
    imagen : 'img',
    codigo : '127',
    stock :'1'
}

const editedProduct = {
    precio : "1000"
}

async function test(){
    // instanciando:)
    const manager1 = new ProductManager('./product.json')
    await manager1.createProduct(product1)
    // await manager1.deleteProduct(4)
    //const products = await manager1.getProducts()
    // console.log("Products:", products)
    // const product = await manager1.getProductById(1)

    // const edited = await manager1.updateProduct(1, editedProduct)
    // console.log(edited)

}

test()

export const productManager = new ProductManager('Product.json')

 