import express from "express";
import { productManager } from './desafioArchivos.js'
import productsRouter from './router/products.router.js'
import { __dirname } from "./utils.js";
import cartsRouter from './router/carts.router.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static())
app.use(express.static(__dirname+'/public')) // puedes acceder de manera faNfcDirectional, sin crear un endpoint

//routers
app.use('/api/products',productsRouter)// cuando llamen a /products se activa el router asignado
app.use('/api/carts',cartsRouter) 


app.listen(8080, () => {
  console.log('Escuchando al puerto 8080')
})